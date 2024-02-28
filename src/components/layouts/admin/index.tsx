import React, { ReactNode } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import { useRouter } from 'next/router';
import { Toaster } from '~/components/ui/toaster';
import { RootState } from '~/store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  userAdminAuth,
  userAdminIsLogin,
} from '~/store/reducers/adminAuthSlice';
import { trpc } from '~/utils/trpc';

type DefaultLayoutProps = { children: ReactNode };

function AdminLayout({ children }: DefaultLayoutProps) {
  const { isLogin } = useSelector((state: RootState) => state.adminAuth);
  const { isSidebarOpen } = useSelector(
    (state: RootState) => state.adminLayout,
  );
  const router = useRouter();
  const dispatch = useDispatch();

  const routesWithoutNavbarAndFooter = [
    '/admin/order-view',
    '/admin/tickets-view',
  ];

  const shouldHideNavbarAndFooter = routesWithoutNavbarAndFooter.some((route) =>
    router.pathname.startsWith(route),
  );

  trpc.admin.me.useQuery(
    { isLogin },
    {
      refetchOnWindowFocus: false,
      onSuccess(data) {
        dispatch(userAdminAuth(data as any));
        dispatch(userAdminIsLogin(true));
      },
    },
  );

  console.log({ shouldHideNavbarAndFooter, router });

  return (
    <div className="relative overflow-y-hidden max-w-[1600px] mx-auto ">
      {router.asPath === '/admin/login' || shouldHideNavbarAndFooter ? (
        <main className="flex-1 m-auto">{children}</main>
      ) : (
        <>
          <Header />
          <div className="flex max-h-[calc(100vh-70px)] overflow-y-hidden">
            <Sidebar />
            <main
              className={`flex-1 w-full ${
                isSidebarOpen ? 'w-[calc(100vw-15%)]' : 'w-[calc(100vw-80px)]'
              }  min-h-[calc(100vh-100px)] overflow-y-scroll`}
            >
              {children}
            </main>
          </div>
        </>
      )}
      <Toaster />
    </div>
  );
}

export default AdminLayout;
