import BOOK_UTILS_ABI from "../contracts/BookUtils.json";
import type { BookUtils } from "../contracts/types";
import useContract from "./useContract";

export default function useBookUtilsContract(contractAddress?: string) {
  return useContract<BookUtils>(contractAddress, BOOK_UTILS_ABI);
}
