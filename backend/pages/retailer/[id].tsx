import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [10, 100, 200, 250, 120, 400, 200],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [10, 100, 200, 250, 120, 400, 200],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const Home: NextPage = ({
  id,
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
        <div className="grid w-full grid-cols-2 gap-5">
          <div className="w-full">
            <Bar options={options} data={data} />
          </div>
          <div className="w-full">
            <Line options={options} data={data} />
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      id: params?.id,
    },
  };
};
