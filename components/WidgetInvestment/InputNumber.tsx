import { type HTMLProps, useEffect, useState } from "react"
import { withPreventDefault } from "@/lib/inputs"

function InputNumber<InputValueType = string>({
  onChange,
  value: externalValue,
  maxValue,
  ...props
}: Omit<HTMLProps<HTMLInputElement>, "onChange" | "value"> & {
  onChange: (n: InputValueType) => void
  maxValue: InputValueType
  value: InputValueType
}) {
  const [value, setValue] = useState<InputValueType>()

  function handleOnChange(value: InputValueType) {
    if (isFinite(value as any)) {
      setValue(value)
      onChange(value)
    }
  }

  useEffect(() => {
    setValue(externalValue as any)
  }, [externalValue])

  function handleSetMax() {
    handleOnChange(maxValue)
  }

  return (
    <label className="text-xl bg-white flex items-center border rounded ring-yearn-blue focus-within:ring-2">
      <input
        {...props}
        value={value as any}
        className="block bg-transparent w-full p-2 outline-none"
        onChange={({ target }) => handleOnChange(target.value as any)}
        placeholder="0.000"
        name="amount"
        required
      />
      <button
        onClick={withPreventDefault(handleSetMax)}
        className="h-full px-4 border-l text-sm text-zinc-600"
      >
        MAX
      </button>
    </label>
  )
}

export default InputNumber
