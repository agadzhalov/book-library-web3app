type AvailableBooks = {
  allBooks: any;
};

const AvailableBooksList = ({ allBooks }: AvailableBooks) => {
  return (
    <div className="results-form">
      <div className="books">
        <h3>Books</h3>
        <table>
          <tbody>
            <tr>
              <td><b>Id:</b></td>
              <td><b>Name:</b></td>
              <td><b>Author:</b></td>
              <td><b>Av Copies:</b></td>
            </tr>
            { allBooks && allBooks.map((book, i) => {
                return (
                  <tr key={i}>
                    <td>{book.id}</td>
                    <td>{book.name}</td>
                    <td>{book.author}</td>
                    <td>{book.copies}</td>
                  </tr>
                )
              })}
          </tbody>
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

export default AvailableBooksList;
