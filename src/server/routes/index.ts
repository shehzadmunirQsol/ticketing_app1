import { Hono } from "hono";

import authRouter from "./auth";

type Route = {
  path: string;
  router: Hono;
};
// api routes
const routes: Route[] = [
  // { path: "/album", router: albumRouter },
  // { path: "/artist", router: artistRouter },
  // { path: "/genre", router: genreRouter },
  // { path: "/playlist", router: playlistRouter },
  // { path: "/song", router: songRouter },
  // { path: "/user", router: userRouter },
  { path: "/auth", router: authRouter },
];

export default routes;
