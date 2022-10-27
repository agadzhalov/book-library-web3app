import { useEffect, useState } from "react";
import { BookStruct, BookUtils } from "../../contracts/types/BookUtils";

const useAvailableBooks = (contract: BookUtils) => {
    const [allBooks, setAllBooks] = useState<BookStruct[] | undefined>();

    useEffect(() => {
        getAvailableBooks();
    },[])

    const getAvailableBooks = async () => {
        const booksArr : BookStruct[] = await contract.showAvailableBooks();
        setAllBooks(booksArr);
    }
    
    return { getAvailableBooks, allBooks };
}

export default useAvailableBooks;