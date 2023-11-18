import { Request, Response } from "express";
import {  constants, ec, stark, Account, Provider, hash, CallData, Contract } from "starknet";

export const sendEth = async ( // body: nip, from, to, amount, id? 
  req: Request,
  res: Response
) => {
  let {id, from, to, amount, nip} =req.body
  
  // connect provider
const provider = new Provider({ sequencer: { network: constants.NetworkName.SN_GOERLI } });

// new Open Zeppelin account v0.5.1
// Generate public and private key pair.
const randadd = id;
const privateKey = randadd;
const starkKeyPub = ec.starkCurve.getStarkKey(privateKey);
const OZaccountClassHash = "0x2794ce20e5f2ff0d40e632cb53845b9f4e526ebd8471983f7dbd355b721d5a";
// Calculate future address of the account
const OZaccountConstructorCallData = CallData.compile({ publicKey: starkKeyPub });
const OZcontractAddress = hash.calculateContractAddressFromHash(
  starkKeyPub,
  OZaccountClassHash,
  OZaccountConstructorCallData,
  "1"
);

console.log('Precalculated account address=', OZcontractAddress);
const account = new Account(provider, OZcontractAddress, privateKey, "1");

// Connect the deployed Test contract in Testnet
const testAddress = "0x5f7cd1fd465baff2ba9d2d1501ad0a2eb5337d9a885be319366b5205a414fdd";

// read abi of Test contract
const { abi: testAbi } = await provider.getClassAt(testAddress);
if (testAbi === undefined) { throw new Error("no abi.") };
const myTestContract = new Contract(testAbi, testAddress, provider);

// Connect account with the contract
myTestContract.connect(account);

const bal1 = await myTestContract.get_balance();
console.log("Initial balance =", bal1.res.toString()); // Cairo 0 contract
//guardar en la db 
res.status(200).send({ wallet: OZcontractAddress, privatekey:randadd, publickey: starkKeyPub  });
  
};