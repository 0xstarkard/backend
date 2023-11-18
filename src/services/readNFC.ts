import { Request, Response } from "express";
import { Account, constants, ec, json, stark, Provider, hash, CallData } from "starknet";
  
export const readNFC = async (req: Request, res: Response) => { 
    var id=req.query['idn'];
  
    // connect provider
const provider = new Provider({ sequencer: { network: constants.NetworkName.SN_GOERLI } });

// new Open Zeppelin account v0.5.1
// Generate public and private key pair.
const randadd = stark.randomAddress();
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
res.status(200).send({ wallet: OZcontractAddress, privatekey:randadd, publickey: starkKeyPub  });
};
