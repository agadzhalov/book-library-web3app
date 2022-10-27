import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useBookUtilsContract from "../../hooks/useBookUtilsContract";
import useCreateABook from "../../hooks/book/useCreateABook";
import PendingTX from "../PendingTX";
import AvailableBooksList from "./AvailableBooksList";
import BorrowABook from "./BorrowABook";
import CreateABook from "./CreateABook";
import EventListener from "./EventListener";
import ReturnABook from "./ReturnABook";
import useAvailableBooks from "../../hooks/book/useAvailableBooks";
import useBorrowABook from "../../hooks/book/useBorrowABook";

type BookUtilsContract = {
  contractAddress: string;
};

const BookLibrary = ({ contractAddress }: BookUtilsContract) => {
  const bookUtilsContract = useBookUtilsContract(contractAddress);

  const { account, library } = useWeb3React<Web3Provider>();
  const [event, setEvent] = useState<any | undefined>({ title: '', data: {}, status: false });

  const { createABook, txHash: createHash, isLoading: isCreateLoading, error: createError } = useCreateABook(bookUtilsContract);
  const { borrowABook, txHash: borrowHash, isLoading: isBorrowLoading, error: borrowError } = useBorrowABook(bookUtilsContract);
  const { allBooks } = useAvailableBooks(bookUtilsContract);

  useEffect(() => {
    //listenBookAddedEvent();
  },[])

  const listenBookAddedEvent = async() => {
    bookUtilsContract.on('BookAddedEvent', (name, author, copies, tx) => {
      const event = {
        title: 'BookAddedEvent',
        data: {
          name: name,
          author: author,
          copies: copies,
          tx: tx
        },
        status: true
      };
      setEvent(event);
    });
  }
  
  return (
    <div className="results-form">
      {/* <EventListener eventData={event} setEvent={setEvent} /> */}
        {!isCreateLoading && (<CreateABook handleCreateNewBook={createABook}  />) }
        {isCreateLoading && (<PendingTX txHash={createHash} />)}

        {!isBorrowLoading && (<BorrowABook handleBorrowABook={borrowABook}  />) }
        {isBorrowLoading && (<PendingTX txHash={borrowHash} />)}

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
