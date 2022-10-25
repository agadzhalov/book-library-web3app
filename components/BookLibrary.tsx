import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { BookStruct } from "../contracts/types/BookUtils";
import useBookUtilsContract from "../hooks/useBookUtilsContract";
import PendingTX from "./PendingTX";

type BookUtilsContract = {
  contractAddress: string;
};


const BookLibrary = ({ contractAddress }: BookUtilsContract) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const [allBooks, setAllBooks] = useState<BookStruct[] | undefined>();
  const bookUtilsContract = useBookUtilsContract(contractAddress);


  useEffect(() => {
    getAvailableBooks();
  },[])

  const createABook = async () => {

  }

  const getAvailableBooks = async () => {
    const booksArr : BookStruct[] = await bookUtilsContract.showAvailableBooks()
    setAllBooks(booksArr);
  }


  return (
    <div className="results-form">
        <div className="books">
            <table>
                <tr>
                    <td>
                        <b>Name:</b>
                    </td>
                    <td>
                        <b>Author:</b>
                    </td>
                    <td>
                        <b>Av Copies:</b>
                    </td>
                </tr>
            {
                allBooks ? allBooks.map((book, i) => {
                    return (
                        <tr> 
                            <td>
                                { book.name }
                            </td>
                            <td>
                                { book.author }
                            </td>
                            <td>
                                { book.copies }
                            </td>
                        </tr>
                    )
                }) : ""
            }
            </table> 

        </div>
        
        
    <style jsx>{`
        .results-form {
          display: flex;
          flex-direction: column;
        }

        .button-wrapper {
          margin: 20px;
        }
        
        .books {
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
