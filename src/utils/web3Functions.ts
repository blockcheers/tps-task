import axios from "axios";

const rpcUrl: any = process.env.POLYGON_RPC_URL;

export async function getBlockByNumber(blockNumber: number): Promise<any> {
  try {
    const response = await axios.post(
      "https://polygon-mainnet.g.alchemy.com/v2/Hb4Dd0uhXFupwXD3xwgfaIgg1lXS8LuG",
      {
        jsonrpc: "2.0",
        method: "eth_getBlockByNumber",
        params: [`0x${blockNumber.toString(16)}`, true],
        id: 1,
      }
    );
    const blockData = response.data.result;
    return blockData;
  } catch (error) {
    throw new Error(`Failed to fetch block: ${error.message}`);
  }
}

export async function getTransactionByHash(transaction: any): Promise<any> {
  try {
    const response = await axios.post(
      "https://polygon-mainnet.g.alchemy.com/v2/Hb4Dd0uhXFupwXD3xwgfaIgg1lXS8LuG",
      {
        jsonrpc: "2.0",
        method: "eth_getTransactionReceipt",
        params: [transaction],
        id: 1,
      }
    );

    const transactionDetails = response.data.result;
    return transactionDetails;
  } catch (error) {
    throw new Error(`Failed to fetch Transaction details: ${error.message}`);
  }
}

export async function getTransactionReceipt(transaction: any): Promise<any> {
  try {
    const response = await axios.post(this.rpcUrl, {
      jsonrpc: "2.0",
      method: "eth_getTransactionByHash",
      params: [transaction],
      id: 1,
    });
    const blockData = response.data.result;
    return blockData;
  } catch (error) {
    throw new Error(`Failed to fetch block: ${error.message}`);
  }
}
