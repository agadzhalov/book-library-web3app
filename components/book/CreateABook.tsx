import { useEffect, useState } from "react";
import { BookStruct } from "../../contracts/types/BookUtils";
import useBookUtilsContract from "../../hooks/useBookUtilsContract";

type BookUtilsContract = {
  contractAddress: string;
  updateTxStatus: any;
};

const CreateABook = ({ contractAddress, updateTxStatus }: BookUtilsContract) => {
  const bookUtilsContract = useBookUtilsContract(contractAddress);

  const [allBooks, setAllBooks] = useState<BookStruct[] | undefined>();

  const [bookName, setBookName] = useState<string | undefined>();
  const [bookAuthor, setBookAuthor] = useState<string | undefined>();
  const [bookCopies, setBookCopies] = useState<number | undefined>();

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
        updateTxStatus({hash: tx.hash, status: true});
        await tx.wait();
        updateTxStatus({hash: tx.hash, status: false});
    } catch (error) {
        console.log(error)
    }

  }

  return (
    <div className="results-form">

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

export default CreateABook;
