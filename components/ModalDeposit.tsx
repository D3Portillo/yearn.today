import PrimitiveModal, { ModalProps } from "./PrimitiveModal"
import WidgetInvestment from "./WidgetInvestment"

function ModalDeposit({
  vaultAddress,
  ...modalProps
}: ModalProps & { vaultAddress: string }) {
  return (
    <PrimitiveModal
      items="items-end lg:items-center"
      maxWidth="flex w-full max-w-md"
      {...modalProps}
    >
      <WidgetInvestment
        rounded="rounded-t-xl lg:rounded-xl min-h-[21rem]"
        maxWidth=""
        vaultAddress={vaultAddress}
      />
    </PrimitiveModal>
  )
}

export default ModalDeposit
