import { Request, Response } from "express";
import { Account, constants, ec, json, stark, Provider, hash, CallData, Contract , cairo} from "starknet";

export const readNFC = async (req: Request, res: Response) => { 
    const from=req.query['from'];
    const to=req.query['to'];
    const amount=req.query['amount'];
    

    //code for sed tx of starknet
    // Check balance - should be 100
const balanceInitial = await erc20.balanceOf(from);
console.log("from has a balance of:", uint256.uint256ToBN(balanceInitial.balance).toString()); // Cairo 0 response

// Mint amount tokens to account address
const amountToMint = cairo.uint256(amount);
console.log("Invoke Tx - Minting  tokens to account0...");
const { transaction_hash: mintTxHash } = await erc20.mint(
    from,
    amountToMint,
    { maxFee: 900_000_000_000_000 }
);

// Wait for the invoke transaction to be accepted on Starknet
console.log(`Waiting for Tx to be Accepted on Starknet - Minting...`);
await provider.waitForTransaction(mintTxHash);

// Check balance - should be 1100
console.log(`Calling Starknet for account balance...`);
const balanceBeforeTransfer = await erc20.balanceOf(account0.address);
console.log("account0 has a balance of:", uint256.uint256ToBN(balanceBeforeTransfer.balance).toString()); // Cairo 0 response

// Execute tx transfer of 10 tokens
console.log(`Invoke Tx - Transfer 10 tokens back to erc20 contract...`);
const toTransferTk: Uint256 = cairo.uint256(amount);
const transferCallData: Call = erc20.populate("transfer", {
    recipient: to,
    amount: toTransferTk // with Cairo 1 contract, 'toTransferTk' can be replaced by '10n'
});
    const { transaction_hash: transferTxHash } = await erc20.transfer( transferCallData.calldata);

// Wait for the invoke transaction to be accepted on Starknet
console.log(`Waiting for Tx to be Accepted on Starknet - Transfer...`);
await provider.waitForTransaction(transferTxHash);

// Check balance after transfer - should be 1090
console.log(`Calling Starknet for account balance...`);
const balanceAfterTransfer = await erc20.balanceOf(account0.address);
console.log("account0 has a balance of:", uint256.uint256ToBN(balanceAfterTransfer.balance).toString()); // Cairo 0 response



res.status(200).send({result:"ok"});
};
