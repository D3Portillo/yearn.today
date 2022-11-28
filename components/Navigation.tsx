import Image from "next/image"
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

import asset_logo from "@/assets/logo.svg"
import { beautifyAddress } from "@/lib/helpers"
import { useEmojiAvatar } from "@/lib/emojiAvatarForAddress"
import Button from "./Button"

function Navigation() {
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()

  return (
    <nav className="h-24 flex items-center justify-between">
      <Image height={32} src={asset_logo} alt="yearn.today logo" />
      {isConnected ? (
        <ProfileButton onClick={openAccountModal} />
      ) : (
        <Button onClick={openConnectModal}>Connect</Button>
      )}
    </nav>
  )
}

function ProfileButton({ onClick }: { onClick: any }) {
  const { address } = useAccount()
  const avatar = useEmojiAvatar()
  const formattedAddress = address ? beautifyAddress(address) : address

  return (
    <button
      onClick={onClick}
      className="bg-zinc-50 border flex items-center py-2 pr-4 pl-2 gap-2 rounded-full"
    >
      <span
        style={{
          backgroundColor: avatar.color,
        }}
        className="w-8 h-8 rounded-full flex items-center justify-center"
      >
        {avatar.emoji}
      </span>
      <span>{formattedAddress}</span>
    </button>
  )
}

export const LoadingState = () => (
  <nav className="h-24 flex items-center justify-between">
    <div className="w-12 h-12 rounded-lg bg-zinc-50 animate-pulse" />
    <div className="w-full max-w-sm h-10 bg-zinc-50 rounded-lg animate-pulse" />
  </nav>
)

export default Navigation
