import { useEffect, useState } from "react";
import useBookUtilsContract from "../../hooks/useBookUtilsContract";

type BorrowABookProps = {
  handleBorrowABook: any;
};

const BorrowABook = ({ handleBorrowABook }: BorrowABookProps) => {
    const [bookHashId, setBookHashId] = useState<string | undefined>();

    useEffect(() => {}, [])

    const stateHashId = (input) => {
        setBookHashId(input.target.value)
    }

  return (
    <div className="results-form">
          <div className="create-book">
              <h3>Borrow a book by hash ID</h3>
              <form>
                  <label>
                      ID:
                      <input onChange={stateHashId} value={bookHashId} type="text" className="hashId" name="book_name" />
                  </label>
                  <button onClick={() => handleBorrowABook(bookHashId)} type="button">Borrow a book</button>
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
        
        .hashId {
            width: 60%;
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

export default BorrowABook;
