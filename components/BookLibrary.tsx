import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useBookUtilsContract from "../hooks/useBookUtilsContract";
import PendingTX from "./PendingTX";

type BookUtilsContract = {
  contractAddress: string;
};

const BookLibrary = ({ contractAddress }: BookUtilsContract) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const bookUtilsContract = useBookUtilsContract(contractAddress);


  useEffect(() => {
    getAvailableBooks();
  },[])

  const getAvailableBooks = async () => {
    const books = await bookUtilsContract.showAvailableBooks()
    console.log(books);
  }


  return (
    <div className="results-form">
        test
    <style jsx>{`
        .results-form {
          display: flex;
          flex-direction: column;
        }

        .button-wrapper {
          margin: 20px;
        }
        
      `}</style>
    </div>
  );
};

export default BookLibrary;
