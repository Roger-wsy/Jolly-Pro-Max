import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Link from "next/link";
// @ts-ignore
import Barcode from "react-barcode";

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
        <Link href="/" passHref>
          <nav className="w-full mb-10 text-sm cursor-pointer text-bold text-primary-100">
            Jolly
          </nav>
        </Link>
        <div className="h-[80vh] w-full flex items-center justify-center">
          <Barcode value={id} width={2} displayValue={true} />
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
