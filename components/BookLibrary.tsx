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
  const bookUtilsContract = useBookUtilsContract(contractAddress);

  const [allBooks, setAllBooks] = useState<BookStruct[] | undefined>();
  const [bookName, setBookName] = useState<string | undefined>();
  const [bookAuthor, setBookAuthor] = useState<string | undefined>();
  const [bookCopies, setBookCopies] = useState<number | undefined>();
  const [txStatus, setTxStatus] = useState<any | undefined>({ hash: '', status: false });

  useEffect(() => {
    getAvailableBooks();
  },[])


  const getAvailableBooks = async () => {
    const booksArr : BookStruct[] = await bookUtilsContract.showAvailableBooks()
    setAllBooks(booksArr);
  }

  const stateBookName = (input) => {
    setBookName(input.target.value)
  }

  const stateBookAuthor = (input) => {
    setBookAuthor(input.target.value)
  }

  const stateBookCopies = (input) => {
    setBookCopies(input.target.value)
  }

  const submitCreateNewBook = async () => {
    try {
        const tx = await bookUtilsContract.addNewBook(bookName, bookAuthor, bookCopies);
        setTxStatus({hash: tx.hash, status: true});
        await tx.wait();
        setTxStatus({hash: tx.hash, status: false});
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="results-form">
        <PendingTX tx={txStatus} />
        <div className="create-book">
            <h3>Create new book</h3>
            <form>
                <label>
                    Name:
                    <input onChange={stateBookName} value={bookName} type="text" name="book_name" />
                </label>
                <label>
                    Author:
                    <input onChange={stateBookAuthor} value={bookAuthor} type="text" name="book_author" />
                </label>
                <label>
                    Copies:
                    <input onChange={stateBookCopies} value={bookCopies} type="number" name="book_copies" />
                </label>
                <button onClick={submitCreateNewBook} type="button">Create new book</button>
            </form>
        </div>

        <div className="books">
            <h3>Books</h3>
            <table>
                <tr>
                    <td>
                        <b>Id:</b>
                    </td>
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
                                { book.id }
                            </td>
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
