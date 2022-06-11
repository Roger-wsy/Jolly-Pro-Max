import { verifyToken } from "lib/jwt";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import dayjs from "dayjs";
import { QUOTA, UTC } from "data/constant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { oil_id } = req.body;
    const oil = await prisma.oil.findUnique({
      where: {
        id: oil_id,
      },
    });
    return res.status(200).json({ oil, message: "ok" });
  } catch (error) {
    return res
      .status(400)
      .json({ error, verified: false, message: "unable to perform task" });
  }
}
