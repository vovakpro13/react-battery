import { useState, useEffect, useRef } from 'react'

interface BatteryStatus {
  level: number
  charging: boolean
  chargingTime: number
  dischargingTime: number
}

const BatteryEvents = [
  'chargingchange',
  'levelchange',
  'chargingtimechange',
  'dischargingtimechange',
]

export const useBattery = (): BatteryStatus => {
  const batteryRef = useRef<BatteryManager | null>(null)

  const [batteryStatus, setBatteryStatus] = useState<BatteryStatus>({
    level: 0,
    charging: false,
    chargingTime: Infinity,
    dischargingTime: Infinity,
  })

  const updateAllBatteryInfo = () => {
    if (batteryRef.current) {
      const { level, charging, chargingTime, dischargingTime } = batteryRef.current

      setBatteryStatus({ level, charging, chargingTime, dischargingTime })
    }
  }

  useEffect(() => {
    if ('getBattery' in navigator) {
      navigator
        .getBattery()
        .then((battery) => {
          batteryRef.current = battery

          BatteryEvents.forEach((eventName) =>
            battery.addEventListener(eventName, updateAllBatteryInfo),
          )

          updateAllBatteryInfo()
        })
        .catch((e) => console.error(e))
    }

    return () => {
      if (batteryRef.current) {
        BatteryEvents.forEach(
          (eventName) => batteryRef.current?.removeEventListener(eventName, updateAllBatteryInfo),
        )
      }
    }
  }, [])

  return batteryStatus
}
