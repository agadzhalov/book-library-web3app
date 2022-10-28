import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import BookLibrary from "../components/book/BookLibrary";
import Error from "../components/book/template/Error";
import NativeCurrencyBalance from "../components/NativeCurrencyBalance";
import TokenBalance from "../components/TokenBalance";
import { ALBT_TOKEN_ADDRESS, BOOK_UTILS_ADDRESS } from "../constants";
import useEagerConnect from "../hooks/useEagerConnect";

function Home() {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  const invalidAddrMsg: string = JSON.stringify({message: "Not a valid Ethereum address"});

  return (
    <div>
      <Head>
        <title>LimeAcademy-boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          <Link href="/">
            <a>LimeAcademy-boilerplate</a>
          </Link>

          <Account triedToEagerConnect={triedToEagerConnect} />
        </nav>
      </header>

      <main>
        <h1>
          Welcome to{" "}
          <a href="https://github.com/agadzhalov/LimeAcademy">
            BookLibrary
          </a>
        </h1>

        {isConnected && (
          <section>
            <NativeCurrencyBalance />

            <TokenBalance tokenAddress={ALBT_TOKEN_ADDRESS} symbol="ALBT" />
            
            {ethers.utils.isAddress(BOOK_UTILS_ADDRESS) && (<BookLibrary contractAddress={BOOK_UTILS_ADDRESS} />)}
            {!ethers.utils.isAddress(BOOK_UTILS_ADDRESS) && (<Error error={invalidAddrMsg} />)}
          </section>
        )}
      </main>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Home;
