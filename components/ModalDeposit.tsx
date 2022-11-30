import PrimitiveModal, { ModalProps } from "./PrimitiveModal"
import WidgetInvestment from "./WidgetInvestment"

function ModalDeposit({
  vaultAddress,
  ...modalProps
}: ModalProps & { vaultAddress: string }) {
  return (
    <PrimitiveModal maxWidth="flex w-full max-w-md" {...modalProps}>
      <WidgetInvestment maxWidth="" vaultAddress={vaultAddress} />
    </PrimitiveModal>
  )
}

export default ModalDeposit
