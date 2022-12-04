import { useState } from "react"

export type OnOffMachine = {
  turnOn(): void
  turnOff(): void
  isOn: boolean
  isOff: boolean
}

/**
 * Simple state machine for truthy values
 * @param isOnByDefault When true, `machine.isOn=true` at invoke.
 * @default isOnByDefault false
 */
function useOnOffMachine(isOnByDefault: boolean = false): OnOffMachine {
  const [isOn, setIsOn] = useState(isOnByDefault)
  const turnOn = () => setIsOn(true)
  const turnOff = () => setIsOn(false)
  return {
    turnOn,
    turnOff,
    isOn,
    isOff: !isOn,
  }
}

export default useOnOffMachine
