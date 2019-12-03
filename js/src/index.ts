// Copyright (c) 2018-2019 Coinbase, Inc. <https://coinbase.com/>
// Licensed under the Apache License, version 2.0

import { Trust } from "./Trust"
import { WalletLink } from "./WalletLink"
import { WalletLinkProvider } from "./WalletLinkProvider"

export { WalletLink } from "./WalletLink"
export { WalletLinkProvider } from "./WalletLinkProvider"
export default WalletLink

declare global {
  interface Window {
    WalletLink: typeof WalletLink
    WalletLinkProvider: typeof WalletLinkProvider
    TrustWeb3Provider: typeof Trust.TrustWeb3Provider
    ethereum?: WalletLinkProvider
    webkit: any
    trustMessage: (...args: any) => void
  }
}

if (typeof window !== "undefined") {
  window.WalletLink = WalletLink
  window.WalletLinkProvider = WalletLinkProvider
  window.TrustWeb3Provider = Trust.TrustWeb3Provider
}
