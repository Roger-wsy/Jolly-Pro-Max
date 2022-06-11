import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";

import { prisma } from "lib/prisma";
import { useState } from "react";
import AddRetailerCard from "components/AddRetailerCard";
import AddOilCard from "components/AddOilCard";
import { Oil } from "@prisma/client";
import Link from "next/link";
const Home: NextPage = ({
  total_customer,
  total_retailer,
  oils,
  retailers,
  total_oil_demand,
  total_oil_supply,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [showAddRetailerCard, setShowAddRetailerCard] = useState(0);
  const [showAddOilCard, setShowAddOilCard] = useState(0);
  // console.log(total_oil_demand);

  return (
    <div className="">
      <AddRetailerCard
        show={showAddRetailerCard}
        setShow={setShowAddRetailerCard}
      />
      <AddOilCard show={showAddOilCard} setShow={setShowAddOilCard} />
      <Head>
        <title>Jolly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="layout">
        <nav className="w-full mb-10 text-sm text-bold text-primary-100">
          Jolly
        </nav>
        <h2 className="mb-10">Metrics</h2>
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
                <path d="M21 13v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7H2v-2l1-5h18l1 5v2h-1zM5 13v6h14v-6H5zm-.96-2h15.92l-.6-3H4.64l-.6 3zM6 14h8v3H6v-3zM3 3h18v2H3V3z" />
              </svg>
              <h2 className="mt-3 text-blue-600 group-hover:text-white">
                Total Retailer
              </h2>
              <h4 className="text-blue-600 opacity-0 group-hover:text-white">
                -
              </h4>
              <h4 className="mt-4 text-lg text-blue-800 group-hover:text-white">
                {total_retailer ?? "--"}
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
                <path d="M21 19h2v2H1v-2h2V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v15h4v-8h-2V9h3a1 1 0 0 1 1 1v9zM5 5v14h8V5H5zm2 6h4v2H7v-2zm0-4h4v2H7V7z" />
              </svg>
              <h2 className="mt-3 text-blue-600 group-hover:text-white">
                Total Oil Supply
              </h2>
              <h4 className="text-blue-600 group-hover:text-white">
                {
                  [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ][new Date().getMonth()]
                }{" "}
                {new Date().getFullYear()}
              </h4>
              <h4 className="mt-4 text-lg text-blue-800 group-hover:text-white">
                {total_oil_supply ?? "--"} litres
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
                <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10H2l2.929-2.929A9.969 9.969 0 0 1 2 12zm4.828 8H12a8 8 0 1 0-8-8c0 2.152.851 4.165 2.343 5.657l1.414 1.414-.929.929zM8 13h8a4 4 0 1 1-8 0z" />
              </svg>
              <h2 className="mt-3 text-blue-600 group-hover:text-white">
                Total Customer
              </h2>
              <h4 className="text-blue-600 opacity-0 group-hover:text-white">
                -
              </h4>
              <h4 className="mt-4 text-lg text-blue-800 group-hover:text-white">
                {total_customer ?? "--"}
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
              <h4 className="text-blue-600 group-hover:text-white">
                {
                  [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ][new Date().getMonth()]
                }{" "}
                {new Date().getFullYear()}
              </h4>
              <h4 className="mt-4 text-lg text-blue-800 group-hover:text-white">
                {total_oil_demand ?? "--"} litres
              </h4>
            </div>
          </div>
        </div>
        <div className="w-full mt-20 mb-10">
          <div className="flex items-center justify-between">
            <h2>Oil</h2>
            <button
              onClick={(e) => {
                setShowAddOilCard(1);
              }}
              className="box-border relative z-30 inline-flex items-center justify-center w-auto px-10 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-blue-600 rounded-md cursor-pointer active:scale-95 group ring-offset-2 ring-1 ring-blue-300 ring-offset-blue-200 hover:ring-offset-blue-500 ease focus:outline-none"
            >
              <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="relative z-20 flex items-center text-base">
                Add Oil
              </span>
            </button>
          </div>
        </div>
        <div className="grid w-full grid-cols-4 gap-5 rounded-t-md">
          <div className="text-bold">ID</div>
          <div className="text-bold">Name</div>
          <div className="text-bold">Litre</div>
          <div className="text-bold">Barcode</div>
        </div>
        <div className="w-full">
          {oils?.map((el: Oil) => (
            <div className="grid w-full grid-cols-4 gap-5 rounded-t-md">
              <div className="text-bold">{el?.id}</div>
              <div className="text-bold">{el?.name ?? "--"}</div>
              <div className="text-bold">{Number(el?.litre) ?? "--"}</div>
              <div className="text-blue-600 underline text-bold">
                <Link href={`/barcode/${el.barcode}`}>
                  <a>Barcode</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full mt-20 mb-10">
          <div className="flex items-center justify-between">
            <h2>Retailer</h2>
            <button
              onClick={(e) => {
                setShowAddRetailerCard(1);
              }}
              className="box-border relative z-30 inline-flex items-center justify-center w-auto px-10 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-blue-600 rounded-md cursor-pointer active:scale-95 group ring-offset-2 ring-1 ring-blue-300 ring-offset-blue-200 hover:ring-offset-blue-500 ease focus:outline-none"
            >
              <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="relative z-20 flex items-center text-base">
                Add Retailer
              </span>
            </button>
          </div>
        </div>
        <div className="grid w-full grid-cols-4 gap-5 rounded-t-md">
          <div className="text-bold">ID</div>
          <div className="text-bold">Name</div>
          <div className="text-bold">Supply / Demand</div>
          <div className="text-bold">Demand / Supply</div>
        </div>
        <div className="w-full">
          {retailers?.map((el: any) => (
            <div className="grid w-full grid-cols-4 gap-5 rounded-t-md">
              <div className="text-bold">{el?.id}</div>
              <div className="text-bold">{el?.name ?? "--"}</div>
              <div className="text-bold">Supply / Demand</div>
              <div className="text-bold">Demand / Supply</div>
            </div>
          ))}
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
  const total_customer = await prisma.customer.count();
  const total_retailer = await prisma.retailer.count();

  const oils = await prisma.oil.findMany();

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
    props: JSON.parse(
      JSON.stringify({
        total_customer,
        total_retailer,
        oils,
        retailers,
        total_oil_demand,
        total_oil_supply,
      })
    ),
  };
};
