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
    const { ic, retailer_id, barcode } = req.body;

    const dbNow = (): Date => dayjs().add(UTC, "hour").toDate();
    const today = new Date(dbNow().setUTCHours(0, 0, 0, 0));
    const tomorrow = new Date(dbNow().setUTCHours(24, 0, 0, 0));
    prisma.transaction
      .findMany({
        where: {
          customer: {
            ic,
          },
          date: {
            gte: today,
            lt: tomorrow,
          },
        },
        include: {
          oil: true,
        },
      })
      .then(async (transactions_today) => {
        const total_oil_purchased_today = transactions_today.reduce(
          (p, c) => p + Number(c?.oil.litre),
          0
        );

        if (total_oil_purchased_today >= QUOTA) {
          return res
            .status(200)
            .json({ verified: false, message: "quota exceeded" });
        } else {
          await prisma.transaction.create({
            data: {
              date: today,
              customer: {
                connect: {
                  ic,
                },
              },
              retailer: {
                connect: {
                  id: retailer_id,
                },
              },
              oil: {
                connect: {
                  id: barcode,
                },
              },
            },
          });
          return res.status(200).json({
            verified: true,
            message: "quota available",
          });
        }
      })
      .catch(async () => {
        await prisma.transaction.create({
          data: {
            date: today,
            customer: {
              connectOrCreate: {
                where: {
                  ic,
                },
                create: {
                  ic,
                },
              },
            },
            retailer: {
              connect: {
                id: retailer_id,
              },
            },
            oil: {
              connect: {
                id: barcode,
              },
            },
          },
        });
        return res
          .status(200)
          .json({ verified: true, message: "quota available" });
      });
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .json({ error, verified: false, message: "unable to perform task" });
  }
}
