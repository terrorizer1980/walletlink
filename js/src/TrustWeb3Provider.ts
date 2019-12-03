import {
  WalletLinkProvider,
  WalletLinkProviderOptions
} from "./WalletLinkProvider"

export class TrustWeb3Provider extends WalletLinkProvider {
  constructor(options: Readonly<WalletLinkProviderOptions>) {
    super(options)
  }
}
