import { jwtVerify, SignJWT } from "jose";
import { nanoid } from "nanoid";
import { TOKEN_SECRET } from "data/constant";

export const generateToken = async (oil_id: string) => {
  const token = await new SignJWT({
    oil_id,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    // .setExpirationTime('2h')
    .sign(new TextEncoder().encode(TOKEN_SECRET));
  return token;
};

export const verifyToken = async (token: string | undefined) => {
  try {
    if (!token) {
      return null;
    }
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(TOKEN_SECRET)
    );
    return payload;
  } catch (error) {
    return null;
  }
};
