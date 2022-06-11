import { generateToken, verifyToken } from "lib/jwt";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import { nanoid } from "nanoid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { retailer_id, litre } = req.body;

    const id = nanoid();

    const barcode = await generateToken(retailer_id, id);

    const oil = await prisma.oil.create({
      data: {
        id,
        litre,
        barcode,
      },
    });

    return res.status(200).json({ oil, message: "ok" });
  } catch (error) {
    return res
      .status(400)
      .json({ error, verified: false, message: "unable to perform task" });
  }
}
