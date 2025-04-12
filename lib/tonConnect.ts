import { TonConnect } from "@tonconnect/sdk";

let tonConnectInstance: TonConnect | null = null;

export function getTonConnect(): TonConnect | null {
  if (typeof window === "undefined") return null;

  if (!tonConnectInstance) {
    tonConnectInstance = new TonConnect({
      manifestUrl:
        "https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json",
    });
  }

  return tonConnectInstance;
}
