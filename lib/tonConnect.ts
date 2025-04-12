import { TonConnect } from "@tonconnect/sdk";

let tonConnectInstance: TonConnect | null = null;

export function getTonConnect(): TonConnect | null {
  if (typeof window === "undefined") return null;

  if (!tonConnectInstance) {
    tonConnectInstance = new TonConnect({
      manifestUrl:
        "https://auth-test-ashen.vercel.app/tonconnect-manifest.json",
    });
  }

  return tonConnectInstance;
}
