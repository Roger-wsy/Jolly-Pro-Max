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
    const { retailer_id, litre } = req.body;

    const dbNow = (): Date => dayjs().add(UTC, "hour").toDate();
    const today = new Date(dbNow().setUTCHours(0, 0, 0, 0));
    const supply = await prisma.supply.create({
      data: {
        retailer: {
          connect: {
            id: retailer_id,
          },
        },
        litre,
        date: today,
      },
    });

    return res.status(200).json({ supply, message: "ok" });
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .json({ error, verified: false, message: "unable to perform task" });
  }
}
