import {TrustRelay} from "./TrustRelay";
import {WalletLink} from "./WalletLink";
import {WalletLinkRelay} from "./WalletLinkRelay";
import {WalletLinkProvider} from "./WalletLinkProvider";

export class Trust {
    public static TrustWeb3Provider(
        jsonRpcUrl: string,
        chainId: number = 1,
    ): WalletLinkProvider {
        const trustRelay = new TrustRelay();
        const walletLink = new WalletLink({
            relay: trustRelay,
            appName: 'Trust',
            appLogoUrl: ''
        });
        return walletLink.makeWeb3Provider(
            jsonRpcUrl,
            chainId,
            trustRelay as unknown as WalletLinkRelay,
        );
    }
}