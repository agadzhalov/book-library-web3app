import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useBookUtilsContract from "../../hooks/useBookUtilsContract";
import useCreateABook from "../../hooks/book/useCreateABook";
import PendingTX from "../PendingTX";
import AvailableBooksList from "./AvailableBooksList";
import BorrowABook from "./BorrowABook";
import CreateABook from "./CreateABook";
import ReturnABook from "./ReturnABook";
import useAvailableBooks from "../../hooks/book/useAvailableBooks";
import useBorrowABook from "../../hooks/book/useBorrowABook";
import useReturnABook from "../../hooks/book/useReturnABook";

type BookUtilsContract = {
  contractAddress: string;
};

const BookLibrary = ({ contractAddress }: BookUtilsContract) => {
  const bookUtilsContract = useBookUtilsContract(contractAddress);

  const { account, library } = useWeb3React<Web3Provider>();

  const { allBooks } = useAvailableBooks(bookUtilsContract);
  const { createABook, txHash: createHash, isLoading: isCreateLoading, error: createError } = useCreateABook(bookUtilsContract);
  const { borrowABook, txHash: borrowHash, isLoading: isBorrowLoading, error: borrowError } = useBorrowABook(bookUtilsContract);
  const { returnABook, txHash: returnHash, isLoading: isReturnLoading, error: returnError } = useReturnABook(bookUtilsContract);

  useEffect(() => {

  },[])


  return (
    <div className="results-form">
        {!isCreateLoading && (<CreateABook handleCreateNewBook={createABook} error={JSON.stringify(createError)}  />) }
        {isCreateLoading && (<PendingTX txHash={createHash} />)}

        {!isBorrowLoading && (<BorrowABook handleBorrowABook={borrowABook} />) }
        {isBorrowLoading && (<PendingTX txHash={borrowHash} />)}

        {!isReturnLoading && (<ReturnABook handleReturnABook={returnABook} />) }
        {isReturnLoading && (<PendingTX txHash={returnHash} />)}

        <AvailableBooksList allBooks={allBooks} />
    <style jsx>{`
        .results-form {
          display: flex;
          flex-direction: column;
        }

        .button-wrapper {
          margin: 20px;
        }
        
        .books, .create-book {
            width: 50%;
            margin: 0 auto;
            text-align: left;
        }

        table {
            width: 100%;
        }

        table tr {
            background: #ffffff;
        }

        table td {
            border: 1px solid #000000;
        }

      `}</style>
    </div>
  );
};

export default BookLibrary;
