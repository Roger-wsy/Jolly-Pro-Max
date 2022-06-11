import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";

import { prisma } from "lib/prisma";
const Home: NextPage = ({
  total_oil_demand,
  total_oil_supply,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="">
      <Head>
        <title>Jolly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="layout">
        <nav className="w-full mb-10 text-sm text-bold text-primary-100">
          Jolly
        </nav>
        <div className="grid w-full grid-cols-4 gap-10">
          <div className="box-border relative z-30 inline-flex items-center justify-center w-auto px-5 py-6 overflow-hidden font-bold text-white transition-all duration-300 bg-white rounded-md cursor-pointer hover:bg-blue-600 group active:scale-95 ring-offset-2 ring-1 ring-blue-600 ring-offset-blue-200 hover:ring-offset-blue-700 ease focus:outline-none">
            <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <div className="relative z-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="w-10 h-10 text-black group-hover:text-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="currentColor"
                  d="M9.07 7L6 11.606V20h12V7H9.07zM8 5h11a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V11l4-6zm5-4h5a1 1 0 0 1 1 1v2h-7V2a1 1 0 0 1 1-1zM8 12h2v6H8v-6z"
                />
              </svg>
              <h2 className="mt-3 text-blue-600 group-hover:text-white">
                Total Oil Supply
              </h2>
              <h4 className="mt-4 text-base text-gray-500 group-hover:text-white">
                {total_oil_supply ?? "--"}
              </h4>
            </div>
          </div>
          <div className="box-border relative z-30 inline-flex items-center justify-center w-auto px-5 py-6 overflow-hidden font-bold text-white transition-all duration-300 bg-white rounded-md cursor-pointer hover:bg-blue-600 group active:scale-95 ring-offset-2 ring-1 ring-blue-600 ring-offset-blue-200 hover:ring-offset-blue-700 ease focus:outline-none">
            <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <div className="relative z-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="w-10 h-10 text-black group-hover:text-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M8 5h11a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V11l4-6zm5-4h5a1 1 0 0 1 1 1v2h-7V2a1 1 0 0 1 1-1zM6 12v7h2v-7H6z" />
              </svg>
              <h2 className="mt-3 text-blue-600 group-hover:text-white">
                Total Oil Demand
              </h2>
              <h4 className="mt-4 text-base text-gray-500 group-hover:text-white">
                {total_oil_demand ?? "--"}
              </h4>
            </div>
          </div>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <div className="flex items-center justify-center gap-1">
          Powered by
          <span className="font-bold text-primary-100">Jolly Pro Max</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const now = new Date();
  let this_month = new Date(now.getFullYear(), now.getMonth(), 1);
  let next_month;
  if (this_month.getMonth() == 11) {
    next_month = new Date(this_month.getFullYear() + 1, 0, 1);
  } else {
    next_month = new Date(
      this_month.getFullYear(),
      this_month.getMonth() + 1,
      1
    );
  }
  const retailers = await prisma?.retailer.findMany({
    where: {
      transaction: {
        every: {
          date: {
            gte: this_month,
            lt: next_month,
          },
        },
      },
    },
    include: {
      transaction: {
        include: {
          oil: true,
        },
      },
      get_supply: true,
    },
  });

  let total_oil_demand = 0;
  retailers.map((r) => {
    const oil_demand = r.transaction.reduce(
      (p, c) => p + Number(c.oil.litre),
      0
    );
    total_oil_demand += oil_demand;
  });

  let total_oil_supply = 0;
  retailers.map((r) => {
    const oil_supply = r.get_supply.reduce((p, c) => p + Number(c.litre), 0);
    total_oil_supply += oil_supply;
  });

  return {
    props: {
      total_oil_demand,
      total_oil_supply,
    },
  };
};
