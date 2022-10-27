import { useEffect, useState } from "react";
import Error from "./template/Error";

type ReturnABookProps = {
    handleReturnABook: any;
    error: any;
};

const ReturnABook = ({ handleReturnABook, error }: ReturnABookProps) => {

  const [bookHashId, setBookHashId] = useState<string | undefined>();

    useEffect(() => {}, [])

    const stateHashId = (input) => {
        setBookHashId(input.target.value)
    }

  return (
    <div className="results-form">
          <div className="create-book">
              <h3>Return a book by hash ID</h3>
              <form>
                  <label>
                      ID:
                      <input onChange={stateHashId} value={bookHashId} type="text" className="hashId" name="book_name" />
                  </label>
                  <button onClick={() => handleReturnABook(bookHashId)} type="button">Return a book</button>
              </form>
              <Error error={error} />
          </div>
        
    <style jsx>{`
        .hashId {
            width: 60%;
        }

        .books, .create-book {
            width: 50%;
            margin: 0 auto;
            text-align: left;
        }

      `}</style>
    </div>
  );
};

export default ReturnABook;
