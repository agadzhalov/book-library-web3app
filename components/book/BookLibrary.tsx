import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useBookUtilsContract from "../../hooks/useBookUtilsContract";
import PendingTX from "../PendingTX";
import AvailableBooksList from "./AvailableBooksList";
import BorrowABook from "./BorrowABook";
import CreateABook from "./CreateABook";
import EventListener from "./EventListener";

type BookUtilsContract = {
  contractAddress: string;
};

const BookLibrary = ({ contractAddress }: BookUtilsContract) => {
  const bookUtilsContract = useBookUtilsContract(contractAddress);

  const { account, library } = useWeb3React<Web3Provider>();
  const [txStatus, setTxStatus] = useState<any | undefined>({ hash: '', status: false });
  const [event, setEvent] = useState<any | undefined>({ title: '', data: {}, status: false });

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
      <EventListener eventData={event} setEvent={setEvent} />
        {!txStatus.status ? (
                <div>
                    <CreateABook contractAddress={contractAddress} updateTxStatus={setTxStatus}  />
                    <BorrowABook contractAddress={contractAddress} updateTxStatus={setTxStatus}  />
                    <AvailableBooksList contractAddress={contractAddress} />
                </div>
            ) : (
                <PendingTX tx={txStatus} />
            )}
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
