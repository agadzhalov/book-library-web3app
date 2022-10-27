import { useState } from "react";
import { BookUtils } from "../../contracts/types";

const useReturnABook = (contract: BookUtils) => {
    const [txHash, setTxHash] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
    const [error, setError] = useState<any | undefined>();

    const returnABook = async(hashId: string) => {
        try {
            console.log('vlizai')
            const tx = await contract.returnBook(hashId);
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
    
    return { returnABook, txHash, isLoading, error };
}

export default useReturnABook;