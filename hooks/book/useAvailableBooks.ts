import { useEffect, useState } from "react";
import { BookStruct } from "../../contracts/types/BookUtils";

const useAvailableBooks = (contract: any) => {
    const [allBooks, setAllBooks] = useState<BookStruct[] | undefined>();

    useEffect(() => {
        getAvailableBooks();
        listenBookAddedEvent();
    },[])

    const getAvailableBooks = async () => {
        const booksArr : BookStruct[] = await contract.showAvailableBooks();
        setAllBooks(booksArr);
    }

    const listenBookAddedEvent = async () => {
        contract.on('BookAddedEvent', (name, author, copies, tx) => {
          getAvailableBooks();
        });
    }
    
    return { allBooks };
}

export default useAvailableBooks;