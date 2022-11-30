import { Fragment, PropsWithChildren } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { classnames, noOp } from "@/lib/helpers"

export type ModalProps = PropsWithChildren<{
  show?: boolean
  onClose?(): void
  className?: string
  maxWidth?: string
  background?: string
  justify?: string
  items?: string
}>

function PrimitiveModal({
  children,
  show = false,
  onClose = noOp,
  maxWidth = "max-w-lg",
  background = "bg-darker",
  items = "items-center",
  justify = "justify-center",
  className,
}: ModalProps) {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={classnames(
              justify,
              items,
              "fixed inset-0 flex",
              className
            )}
          >
            <Dialog.Panel className={classnames(maxWidth, background)}>
              {children}
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default PrimitiveModal
