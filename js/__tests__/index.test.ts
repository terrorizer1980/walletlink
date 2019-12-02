require('es6-promise').polyfill();
require('isomorphic-fetch');

import {TrustRelay} from "../src/TrustRelay";
import {WalletLink, WalletLinkProvider} from "../src";
import {WalletLinkRelay} from "../src/WalletLinkRelay";
import Web3 from 'web3'
import {IpcProvider} from "web3-core";


const config = {
    address: "0x5Ee066cc1250E367423eD4Bad3b073241612811f",
    chainId: 1,
    jsonRpcUrl: process.env.INFURA_API_KEY ? `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}` : ""
};

const createProvider: (conf: any) => WalletLinkProvider = (conf: any) => {
    const trustRelay = new TrustRelay();
    const walletLink = new WalletLink({
        relay: trustRelay as unknown as WalletLinkRelay,
        appName: 'Trust',
        appLogoUrl: ''
    });
    return walletLink.makeWeb3Provider(
        conf.jsonRpcUrl,
        conf.chainId,
        trustRelay as unknown as WalletLinkRelay
    );
}

describe("TrustWeb3Provider constructor tests", () => {
    test("test constructor.name", () => {
        const provider = createProvider(config);
        const web3 = new Web3();
        web3.setProvider(provider);
        expect(web3.currentProvider.constructor.name).toBe("TrustWeb3Provider");
    });

    test("test eth_chainId", done => {
        const ropsten = {
            address: "0xbE74f965AC1BAf5Cc4cB89E6782aCE5AFf5Bd4db",
            chainId: 3,
            jsonRpcUrl: "https://ropsten.infura.io/apikey",
        };
        const provider = createProvider(ropsten);
        const web3 = new Web3();
        web3.setProvider(provider);

        const request = {
            jsonrpc: "2.0",
            method: "eth_chainId",
            id: 123,
            params: []
        };
        (web3.currentProvider as IpcProvider).send(request, (error, result) => {
            if (error) {
                done.fail(error);
            }
            expect(result.result).toBe("0x3");
            done();
        });
    });
});