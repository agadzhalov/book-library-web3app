import { useState } from "react";

const useCreateABook = (contract: any) => {
    const [txHash, setTxHash] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
    const [error, setError] = useState<any | undefined>();

    const createABook = async(bookName: string, bookAuthor: string, bookCopies: number) => {
        try {
            const tx = await contract.addNewBook(bookName, bookAuthor, bookCopies);
            setIsLoading(true);
            setTxHash(tx.hash);
            await tx.wait();
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }
    
    return { createABook, txHash, isLoading, error };
}

export default useCreateABook;