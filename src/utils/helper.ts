export const validateEmail = (email: string): boolean => {
  const emailParts = email.split("@");
  if (emailParts.length !== 2) {
    // Ensure there's exactly one "@" symbol in the email address
    return false;
  }

  const domain = emailParts[1];
  const domainParts = domain?.split(".");
  if (
    domainParts &&
    ["google"].find((item) => domainParts.includes(item))
    // ['google', 'yahoo', 'outlook'].find((item) => domainParts.includes(item))
  ) {
    // Ensure there's at least one subdomain and a top-level domain
    return false;
  }

  if (domainParts && domainParts.length < 2) {
    // Ensure there's at least one subdomain and a top-level domain
    return false;
  }

  // Check for duplicates in the domainParts array
  const uniqueDomainParts = new Set(domainParts);
  if (domainParts && uniqueDomainParts.size !== domainParts.length) {
    // If there are duplicates, return false
    return false;
  }

  return true;
};
export const validateRegixEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
  return regex.test(email);
};
export function formatTrpcError(trpcError = "Something went wrong!" as string) {
  if (trpcError?.includes("[\n  {\n  ")) {
    const formattedError = JSON.parse(trpcError);
    const msgError =
      formattedError?.length > 0
        ? formattedError[0].message
        : "Internal server error";
    return msgError;
  } else {
    return trpcError;
  }
}
