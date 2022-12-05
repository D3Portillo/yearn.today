import toast from "react-hot-toast"

function useToastTransaction() {
  return {
    toastTransaction(rawTx: Promise<any>) {
      let toaster = toast.loading("Working...")
      rawTx
        .then(async (tx) => {
          await tx?.wait()
          toast.success("Yaay 🥳!")
        })
        .catch((error) => {
          toast.error("Oops something went wrong")
          console.error({ error })
        })
        .finally(() => {
          toast.dismiss(toaster)
        })
    },
  }
}

export default useToastTransaction
