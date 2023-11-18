"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNativeBalance = exports.signMessage = exports.web3 = void 0;
const web3_1 = __importDefault(require("web3"));
exports.web3 = new web3_1.default(process.env.RPC_PROVIDER);
const signMessage = (message, pk) => {
    const signedMessage = exports.web3.eth.accounts.sign(message, pk);
    return signedMessage;
};
exports.signMessage = signMessage;
const getNativeBalance = async (address) => {
    const balanceInWei = await exports.web3.eth.getBalance(address);
    const balance = Number(web3_1.default.utils.fromWei(balanceInWei));
    console.log("Balance ", balance);
    return balance;
};
exports.getNativeBalance = getNativeBalance;
//# sourceMappingURL=web3utils.js.map