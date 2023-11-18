"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWallet = void 0;
const starknet_1 = require("starknet");
const createWallet = async (req, res) => {
    var id = req.query['idn'];
    // connect provider
    const provider = new starknet_1.Provider({ sequencer: { network: starknet_1.constants.NetworkName.SN_GOERLI } });
    // new Open Zeppelin account v0.5.1
    // Generate public and private key pair.
    const randadd = id;
    const privateKey = randadd;
    const starkKeyPub = starknet_1.ec.starkCurve.getStarkKey(privateKey);
    const OZaccountClassHash = "0x2794ce20e5f2ff0d40e632cb53845b9f4e526ebd8471983f7dbd355b721d5a";
    // Calculate future address of the account
    const OZaccountConstructorCallData = starknet_1.CallData.compile({ publicKey: starkKeyPub });
    const OZcontractAddress = starknet_1.hash.calculateContractAddressFromHash(starkKeyPub, OZaccountClassHash, OZaccountConstructorCallData, "1");
    console.log('Precalculated account address=', OZcontractAddress);
    //guardar en la db 
    res.status(200).send({ wallet: OZcontractAddress, privatekey: randadd, publickey: starkKeyPub });
};
exports.createWallet = createWallet;
//# sourceMappingURL=createWallet.js.map