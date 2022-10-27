import { useEffect, useState } from "react";
import { BookStruct, BookUtils } from "../../contracts/types/BookUtils";
import useAvailableBooks from "./useAvailableBooks";

const useCreatedBookEvent = (contract) => {
    const { getAvailableBooks } = useAvailableBooks(contract);
    const [books, setBooks] = useState<any | undefined>();

    useEffect(() => {
        contract.on('BookAddedEvent', (name, author, copies, tx) => {
            getAvailableBooks();
        });
    },[]);

    const listenForCretedBookEvent = async () => {
        
    }

    //return listenForCretedBookEvent;
    // const listenBookAddedEvent = async() => {
    //     bookUtilsContract.on('BookAddedEvent', (name, author, copies, tx) => {
    //       const event = {
    //         title: 'BookAddedEvent',
    //         data: {
    //           name: name,
    //           author: author,
    //           copies: copies,
    //           tx: tx
    //         },
    //         status: true
    //       };
    //       setEvent(event);
    //     });
    //   }
    
}

export default useCreatedBookEvent;