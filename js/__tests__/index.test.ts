require("es6-promise").polyfill()
require("isomorphic-fetch")

import Web3 from "web3"
import { IpcProvider } from "web3-core"
import { WalletLinkProvider } from "../src"
import { Trust } from "../src/trust/Trust"

const config = {
  address: "0x5Ee066cc1250E367423eD4Bad3b073241612811f",
  chainId: 1,
  jsonRpcUrl: "https://mainnet.infura.io/v3/6e822818ec644335be6f0ed231f48310"
}

const createProvider: (conf: any) => WalletLinkProvider = (conf: any) => {
  return Trust.TrustWeb3Provider(conf.jsonRpcUrl, conf.chainId, "jest app")
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
    const provider = createProvider(config)
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
      expect(result.result).toBe("0x1")
      done()
    })
  })
})
