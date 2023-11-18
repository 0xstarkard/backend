import { Request, Response } from "express";
import {  constants, ec, stark, Account, Provider, hash, CallData, Contract, cairo } from "starknet";

export const createWallet = async (
  req: Request,
  res: Response
) => {
  var id=req.query['idn'];
  
  // connect provider
const provider = new Provider({ sequencer: { network: constants.NetworkName.SN_GOERLI } });

// new Open Zeppelin account v0.5.1
// Generate public and private key pair.
const randadd = id;
const privateKey = randadd;
const starkKeyPub = ec.starkCurve.getStarkKey(privateKey as string);
const OZaccountClassHash = "0x2794ce20e5f2ff0d40e632cb53845b9f4e526ebd8471983f7dbd355b721d5a";
// Calculate future address of the account
const OZaccountConstructorCallData = CallData.compile({ publicKey: starkKeyPub });
const OZcontractAddress = hash.calculateContractAddressFromHash(
  starkKeyPub,
  OZaccountClassHash,
  OZaccountConstructorCallData,
  "1"
);

// send funds
console.log('Precalculated account address=', OZcontractAddress);
const erc20Address = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
const { abi: testAbi } = await provider.getClassAt(erc20Address);
if (testAbi === undefined) { throw new Error("no abi.") };
// Create a new erc20 contract object
const erc20 = new Contract(testAbi, erc20Address, provider);

const account = new Account(provider, "0x0494cA5Fcf3861774550bb72d6be7DA08Df1857838A111f64987D135AaF5DE43", process.env.ARGENT, "1");

erc20.connect(account);

console.log(`Invoke Tx - Transfer 10 tokens back to erc20 contract...`);
const toTransferTk = cairo.uint256(0.01);
const transferCallData = erc20.populate("transfer", {
    recipient: OZcontractAddress,
    amount: toTransferTk // with Cairo 1 contract, 'toTransferTk' can be replaced by '10n'
});
    const { transaction_hash: transferTxHash } = await erc20.transfer( transferCallData.calldata);

// Wait for the invoke transaction to be accepted on Starknet
console.log(`Waiting for Tx to be Accepted on Starknet - Transfer...`);
await provider.waitForTransaction(transferTxHash);

// Deploy Account
const OZaccount = new Account(provider, OZcontractAddress, privateKey as string, "1");

const { transaction_hash, contract_address } = await OZaccount.deployAccount({
    classHash: OZaccountClassHash,
    constructorCalldata: OZaccountConstructorCallData,
    addressSalt: starkKeyPub
});

await provider.waitForTransaction(transaction_hash);
console.log('✅ New OpenZeppelin account created.\n   address =', contract_address);

//guardar en la db 
res.status(200).send({ wallet: OZcontractAddress, privatekey:randadd, publickey: starkKeyPub  });
  
};