require("es6-promise").polyfill()
require("isomorphic-fetch")

import Web3 from "web3"
import { IpcProvider } from "web3-core"
import { WalletLinkProvider } from "../src"
import { Trust } from "../src/Trust"

const config = {
  address: "0x5Ee066cc1250E367423eD4Bad3b073241612811f",
  chainId: 1,
  jsonRpcUrl: "https://mainnet.infura.io/v3/376c261ffd284d46afa15e8aa5dc1e36"
}

const createProvider: (conf: any) => WalletLinkProvider = (conf: any) => {
  return Trust.TrustWeb3Provider(conf.jsonRpcUrl, conf.chainId)
}

describe("TrustWeb3Provider constructor tests", () => {
  test("test constructor.name", () => {
    const provider = createProvider(config)
    const web3 = new Web3()
    web3.setProvider(provider)
    expect(web3.currentProvider.constructor.name).toBe("TrustWeb3Provider")
  })

  test("test isTrust", () => {
    const provider = createProvider(config)
    const web3 = new Web3()
    web3.setProvider(provider)
    expect((web3.currentProvider as any).isTrust).toBe(true)
  })

  test("test eth_chainId", done => {
    const ropsten = {
      address: "0xbE74f965AC1BAf5Cc4cB89E6782aCE5AFf5Bd4db",
      chainId: 3,
      jsonRpcUrl: "https://ropsten.infura.io/apikey"
    }
    const provider = createProvider(ropsten)
    const web3 = new Web3()
    web3.setProvider(provider)

    const request = {
      jsonrpc: "2.0",
      method: "eth_chainId",
      id: 123,
      params: []
    }
    ;(web3.currentProvider as IpcProvider).send(request, (error, result) => {
      if (error) {
        done.fail(error)
      }
      expect(result.result).toBe("0x3")
      done()
    })
  })
})
