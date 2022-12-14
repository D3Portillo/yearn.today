import Image from "next/image"
import asset_usdc from "@/assets/usdc.webp"

function AssetImage({ src }: { src: any }) {
  return (
    <div className="p-4 bg-white border border-zinc-100 rounded-xl">
      <figure className="w-20 h-20 lg:w-16 lg:h-16">
        <Image
          className="flex text-4xl items-center justify-center"
          alt="💰"
          blurDataURL={asset_usdc.blurDataURL}
          placeholder={src ? "empty" : "blur"}
          src={src || ""}
          width={120}
          height={120}
        />
      </figure>
    </div>
  )
}

export default AssetImage
