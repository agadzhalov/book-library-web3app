import { useEffect, useState } from "react";
import useBookUtilsContract from "../../hooks/useBookUtilsContract";

type BookUtilsContract = {
  contractAddress: string;
  updateTxStatus: any;
};

const BorrowABook = ({ contractAddress, updateTxStatus }: BookUtilsContract) => {
  const bookUtilsContract = useBookUtilsContract(contractAddress);

  const [bookHashId, setBookHashId] = useState<string | undefined>();

    useEffect(() => {}, [])

    const stateHashId = (input) => {
        setBookHashId(input.target.value)
    }

    const submitBorrowABook = async () => {
        try {
            const tx = await bookUtilsContract.borrowABook(bookHashId);
            updateTxStatus({ hash: tx.hash, status: true });
            await tx.wait().then(() => {
                updateTxStatus({ hash: tx.hash, status: false });
            });
            resetForm();
        } catch (error) {
            console.log(error)
        }
    }

    const resetForm = async () => {
        setBookHashId('');
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
                  <button onClick={submitBorrowABook} type="button">Borrow a book</button>
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
