// import jwt from "jsonwebtoken";
import * as jose from "jose";
const SECRET = process.env.TOKEN_SECRET || "T3TUT";

export async function signJWT(data: object) {
  const jwtToken = await new jose.SignJWT({ ...data })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(new TextEncoder().encode(SECRET));
  return jwtToken;
}

export async function verifyJWT<T>(token: string) {
  const { payload: jwtData } = await jose.jwtVerify(
    token,
    new TextEncoder().encode(SECRET)
  );
  return jwtData;
  // return jwt.verify(token, SECRET) as T;
}
