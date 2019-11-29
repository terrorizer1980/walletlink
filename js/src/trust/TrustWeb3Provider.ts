import {
  WalletLinkProvider,
  WalletLinkProviderOptions
} from "../provider/WalletLinkProvider"

export class TrustWeb3Provider extends WalletLinkProvider {
  constructor(options: Readonly<WalletLinkProviderOptions>) {
    super(options)
  }
}
