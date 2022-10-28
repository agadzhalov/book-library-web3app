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
import { ethers } from "ethers";
import { BOOK_UTILS_ADDRESS } from "../../constants";

type BookUtilsContract = {
  contractAddress: string;
};

const BookLibrary = ({ contractAddress }: BookUtilsContract) => {
  const bookUtilsContract = useBookUtilsContract(contractAddress);

  const { account, library } = useWeb3React<Web3Provider>();
  
  const { getAvailableBooks, allBooks } = useAvailableBooks(bookUtilsContract);
  const { createABook, txHash: createHash, isLoading: isCreateLoading, error: createError } = useCreateABook(bookUtilsContract);
  const { borrowABook, txHash: borrowHash, isLoading: isBorrowLoading, error: borrowError } = useBorrowABook(bookUtilsContract);
  const { returnABook, txHash: returnHash, isLoading: isReturnLoading, error: returnError } = useReturnABook(bookUtilsContract);

  useEffect(() => {
    bookUtilsContract.on('BookAddedEvent', (name, author, copies, tx) => {
      getAvailableBooks();
    });
    bookUtilsContract.on('BookBorrowedEvent', (name, author, tx) => {
      getAvailableBooks();
    });
    bookUtilsContract.on('BookReturnEvent', (name, author, tx) => {
      getAvailableBooks();
    });
    console.log(ethers.utils.isAddress(BOOK_UTILS_ADDRESS));
  },[])


  return (
    <div className="results-form">
        {!isCreateLoading && (<CreateABook handleCreateNewBook={createABook} error={JSON.stringify(createError)}  />) }
        {isCreateLoading && (<PendingTX txHash={createHash} />)}

        {!isBorrowLoading && (<BorrowABook handleBorrowABook={borrowABook} error={JSON.stringify(borrowError)} />) }
        {isBorrowLoading && (<PendingTX txHash={borrowHash} />)}

        {!isReturnLoading && (<ReturnABook handleReturnABook={returnABook} error={JSON.stringify(returnError)} />) }
        {isReturnLoading && (<PendingTX txHash={returnHash} />)}

        <AvailableBooksList allBooks={allBooks} />
    </div>
  );
};

export default BookLibrary;
