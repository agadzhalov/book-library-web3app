import { useState } from "react";
import { BookUtils } from "../../contracts/types";

const useBorrowABook = (contract: BookUtils) => {
    const [txHash, setTxHash] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
    const [error, setError] = useState<any | undefined>();

    const borrowABook = async(hashId: string) => {
        try {
            const tx = await contract.borrowABook(hashId);
            setIsLoading(true);
            setTxHash(tx.hash);
            await tx.wait();
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }
    
    return { borrowABook, txHash, isLoading, error };
}

export default useBorrowABook;