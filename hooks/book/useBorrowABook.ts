import { useState } from "react";

const useBorrowABook = (contract: any) => {
    const [txHash, setTxHash] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
    const [error, setError] = useState<any | undefined>();

    const borrowABook = async(hashId: string) => {
        try {
            const tx = await contract.borrowABook(hashId);
            setIsLoading(true);
            setTxHash(tx.hash);
            await tx.wait();
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }
    
    return { borrowABook, txHash, isLoading, error };
}

export default useBorrowABook;