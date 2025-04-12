import { TonConnect } from "@tonconnect/sdk";

let tonConnectInstance: TonConnect | null = null;

export function getTonConnect(): TonConnect | null {
  if (typeof window === "undefined") return null;

  if (!tonConnectInstance) {
    tonConnectInstance = new TonConnect({
      manifestUrl: "http://localhost:3000/tonconnect-manifest.json",
    });
  }

  return tonConnectInstance;
}
