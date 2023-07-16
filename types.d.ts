declare global {
  interface BatteryManager {
    charging: boolean
    chargingTime: number
    dischargingTime: number
    level: number
    addEventListener: (
      type: string,
      listener: (this: this, ev: Event) => any,
      options?: boolean | AddEventListenerOptions,
    ) => void
    removeEventListener: (
      type: string,
      listener: (this: this, ev: Event) => any,
      options?: boolean | EventListenerOptions,
    ) => void
  }

  interface Navigator {
    getBattery(): Promise<BatteryManager>
  }
}

export {}
