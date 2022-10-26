import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { BookStruct } from "../../contracts/types/BookUtils";
import useBookUtilsContract from "../../hooks/useBookUtilsContract";
import PendingTX from "../PendingTX";
import AvailableBooksList from "./AvailableBooksList";
import CreateABook from "./CreateABook";

type BookUtilsContract = {
  contractAddress: string;
};

const BookLibrary = ({ contractAddress }: BookUtilsContract) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const bookUtilsContract = useBookUtilsContract(contractAddress);

  const [allBooks, setAllBooks] = useState<BookStruct[] | undefined>();
  const [txStatus, setTxStatus] = useState<any | undefined>({ hash: '', status: false });

  useEffect(() => {
    getAvailableBooks();
  },[])

  const getAvailableBooks = async () => {
    const booksArr : BookStruct[] = await bookUtilsContract.showAvailableBooks()
    setAllBooks(booksArr);
  }


  return (
    <div className="results-form">
        {
            !txStatus.status ? (
                <div>
                    <CreateABook contractAddress={contractAddress} updateTxStatus={setTxStatus} />
                    <AvailableBooksList contractAddress={contractAddress} />
                </div>
            ) : (
                <PendingTX tx={txStatus} />
            )
        }
        

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
