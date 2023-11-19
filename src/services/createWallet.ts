import { Request, Response } from "express";
import {  constants, ec, stark, Account, Provider, hash, CallData, Contract, cairo } from "starknet";
import { createUsers } from "../utils/querys";
export const createWallet = async (
  req: Request,
  res: Response
) => {
  const serial=req.query['serial'];
  const walletbackup=req.query['walletbackup'];
  const linkto=req.query['linkto'];
  
  // connect provider
const provider = new Provider({ sequencer: { network: constants.NetworkName.SN_GOERLI } });

// new Open Zeppelin account v0.5.1
// Generate public and private key pair.

const privateKey = stark.randomAddress();
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

//guardar en la db 
createUsers(serial, starkKeyPub, privateKey, OZcontractAddress,walletbackup , linkto )
res.status(200).send({ wallet: OZcontractAddress, privatekey:privateKey, publickey: starkKeyPub  });
  
};