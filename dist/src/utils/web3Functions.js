"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionReceipt = exports.getTransactionByHash = exports.getBlockByNumber = void 0;
const axios_1 = __importDefault(require("axios"));
const rpcUrl = process.env.POLYGON_RPC_URL;
async function getBlockByNumber(blockNumber) {
    try {
        const response = await axios_1.default.post("https://polygon-mainnet.g.alchemy.com/v2/Hb4Dd0uhXFupwXD3xwgfaIgg1lXS8LuG", {
            jsonrpc: "2.0",
            method: "eth_getBlockByNumber",
            params: [`0x${blockNumber.toString(16)}`, true],
            id: 1,
        });
        const blockData = response.data.result;
        return blockData;
    }
    catch (error) {
        throw new Error(`Failed to fetch block: ${error.message}`);
    }
}
exports.getBlockByNumber = getBlockByNumber;
async function getTransactionByHash(transaction) {
    try {
        const response = await axios_1.default.post("https://polygon-mainnet.g.alchemy.com/v2/Hb4Dd0uhXFupwXD3xwgfaIgg1lXS8LuG", {
            jsonrpc: "2.0",
            method: "eth_getTransactionReceipt",
            params: [transaction],
            id: 1,
        });
        const transactionDetails = response.data.result;
        return transactionDetails;
    }
    catch (error) {
        throw new Error(`Failed to fetch Transaction details: ${error.message}`);
    }
}
exports.getTransactionByHash = getTransactionByHash;
async function getTransactionReceipt(transaction) {
    try {
        const response = await axios_1.default.post(this.rpcUrl, {
            jsonrpc: "2.0",
            method: "eth_getTransactionByHash",
            params: [transaction],
            id: 1,
        });
        const blockData = response.data.result;
        return blockData;
    }
    catch (error) {
        throw new Error(`Failed to fetch block: ${error.message}`);
    }
}
exports.getTransactionReceipt = getTransactionReceipt;
//# sourceMappingURL=web3Functions.js.map