import { AddressString, IntNumber, RegExpString } from "./types"
import { Web3Request } from "./relay/Web3Request"
import {
  ArbitraryResponse,
  EthereumAddressFromSignedMessageResponse,
  RequestEthereumAccountsResponse,
  ScanQRCodeResponse,
  SignEthereumMessageResponse,
  SignEthereumTransactionResponse,
  SubmitEthereumTransactionResponse,
  Web3Response
} from "./relay/Web3Response"
import { EthereumTransactionParams } from "./relay/WalletLinkRelay"

export interface Relay {
  setAppInfo(appName: string, appLogoUrl: string | null): void

  getStorageItem(key: string): string | null

  setStorageItem(key: string, value: string): void

  attach(el: Element): void

  resetAndReload(): void 

  requestEthereumAccounts(): Promise<RequestEthereumAccountsResponse>

  signEthereumMessage(
    message: Buffer,
    address: AddressString,
    addPrefix: boolean,
    typedDataJson?: string | null
  ): Promise<SignEthereumMessageResponse>

  ethereumAddressFromSignedMessage(
    message: Buffer,
    signature: Buffer,
    addPrefix: boolean
  ): Promise<EthereumAddressFromSignedMessageResponse>

  signEthereumTransaction(
    params: EthereumTransactionParams
  ): Promise<SignEthereumTransactionResponse>

  signAndSubmitEthereumTransaction(
    params: EthereumTransactionParams
  ): Promise<SubmitEthereumTransactionResponse>

  submitEthereumTransaction(
    signedTransaction: Buffer,
    chainId: IntNumber
  ): Promise<SubmitEthereumTransactionResponse>

  arbitraryRequest(data: string): Promise<ArbitraryResponse>

  sendRequest<T extends Web3Request, U extends Web3Response>(
    request: T
  ): Promise<U>

  scanQRCode(regExp: RegExpString): Promise<ScanQRCodeResponse>
}
