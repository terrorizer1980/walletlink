import { AddressString, IntNumber, RegExpString } from "./types/common"
import { Web3Request } from "./types/Web3Request"
import {
  ArbitraryResponse,
  EthereumAddressFromSignedMessageResponse,
  RequestEthereumAccountsResponse,
  ScanQRCodeResponse,
  SignEthereumMessageResponse,
  SignEthereumTransactionResponse,
  SubmitEthereumTransactionResponse,
  Web3Response
} from "./types/Web3Response"
import { EthereumTransactionParams } from "./WalletLinkRelay"

export interface Relay {
  setAppInfo(appName: string, appLogoUrl: string | null): void

  injectIframe()

  getStorageItem(key: string): string | null

  setStorageItem(key: string, value: string): void

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
