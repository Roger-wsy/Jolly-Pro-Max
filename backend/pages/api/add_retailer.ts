import { generateToken, verifyToken } from "lib/jwt";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import { nanoid } from "nanoid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name } = req.body;

    await prisma.retailer.create({
      data: {
        name,
      },
    });

    return res.status(200).json({ message: "ok" });
  } catch (error) {
    return res
      .status(400)
      .json({ error, verified: false, message: "unable to perform task" });
  }
}
