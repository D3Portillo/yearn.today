import toast from "react-hot-toast"

function useToastTransaction() {
  return {
    toastTransaction(rawTx: Promise<any>): Promise<void> {
      let toaster = toast.loading("Working...")
      return new Promise((resolve) => {
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
            resolve(toast.dismiss(toaster))
          })
      })
    },
  }
}

export default useToastTransaction
