import Image from "next/image"
import asset_usdc from "@/assets/usdc.webp"

function AssetImage({ src }: { src: any }) {
  return (
    <div className="p-4 bg-white border border-zinc-100 rounded-xl">
      <figure className="w-16 h-16">
        <Image
          className="flex text-4xl items-center justify-center"
          alt="💰"
          placeholder={src ? "empty" : "blur"}
          src={src || asset_usdc}
          width={120}
          height={120}
        />
      </figure>
    </div>
  )
}

export default AssetImage
