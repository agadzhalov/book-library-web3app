
  export interface Networks {
    [key: number]: string;
  }
  export const walletConnectSupportedNetworks: Networks = {
    // Add your network rpc URL here
    1: "https://eth-goerli.g.alchemy.com/v2/b3s6jS5xYcnRbWxRrN1K80kVJ2a-4_wx",
    3: "https://ethereumnode.defiterm-dev.net",
    31337: "http://127.0.0.1:8545"
  };

  // Network chain ids
  export const supportedMetamaskNetworks = [1, 3, 4, 5, 42, 31337];

  export const ALBT_TOKEN_ADDRESS = "0xc6869a93ef55e1d8ec8fdcda89c9d93616cf0a72";
  export const BOOK_UTILS_ADDRESS = "0xbAFa637b2d822974EAaE803f1236811AeC1090D5"; // goerli 0x5FbDB2315678afecb367f032d93F642f64180aa3 localhost