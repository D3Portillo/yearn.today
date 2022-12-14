export const ADDRESS_USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
export const ADDRESS_USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
export const ADDRESS_DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
export const ADDRESS_LUSD = "0x5f98805A4E8be255a32880FDeC7F6728C6568bA0"
export const ADDRESS_TUSD = "0x0000000000085d4780B73119b644AE5ecd22b376"

// Curve Assets
export const ADDRESS_CMIM = "0x5a6A4D54456819380173272A5E8E9B9904BdF41B"
export const ADDRESS_CLUSD = "0xEd279fDD11cA84bEef15AF5D39BB4d4bEE23F0cA"
export const ADDRESS_CGUSD = "0xD2967f45c4f384DEEa880F807Be904762a3DeA07"

/**
 * List of supported assets
 * NOTE: Compare against `toLowerCase`
 */
export const SUPPORTED_ASSETS = [
  ADDRESS_USDC,
  ADDRESS_USDT,
  ADDRESS_DAI,
  ADDRESS_LUSD,
  ADDRESS_TUSD,
  ADDRESS_CMIM,
  ADDRESS_CLUSD,
  ADDRESS_CGUSD,
].map((address) => address.toLowerCase())

export const ALCHEMY_API_KEY = "ZMsNIuwyQN517NmglFm4NAJKzPTpEUTM"
export const ALCHEMY_URL =
  "https://eth-mainnet.g.alchemy.com/v2/ZMsNIuwyQN517NmglFm4NAJKzPTpEUTM"
