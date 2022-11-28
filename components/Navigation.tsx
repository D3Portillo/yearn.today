import Image from "next/image"
import asset_logo from "@/assets/logo.svg"

function Navigation() {
  return (
    <nav className="h-24 flex items-center justify-between">
      <Image height={32} src={asset_logo} alt="yearn.today logo" />
      <button className="bg-yearn-blue py-2 text-lg px-6 rounded-full text-white">
        Connect
      </button>
    </nav>
  )
}

export default Navigation
