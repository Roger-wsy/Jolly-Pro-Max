import { generateToken, verifyToken } from "lib/jwt";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import { nanoid } from "nanoid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name, litre } = req.body;

    console.log(name, litre);

    const id = nanoid();

    // const barcode = await generateToken(id);

    const oil = await prisma.oil.create({
      data: {
        id,
        name,
        litre,
      },
    });

    return res.status(200).json({ oil, message: "ok" });
  } catch (error) {
    return res
      .status(400)
      .json({ error, verified: false, message: "unable to perform task" });
  }
}
