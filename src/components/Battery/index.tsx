import { useBattery } from '../../hooks/useBattery'
import './style.css'
import { getTime } from '../../helpers/get-time.ts'

const Battery = () => {
  const { level, charging, chargingTime, dischargingTime } = useBattery()

  const batteryPercentage = Math.floor(level * 100)
  const chargingTimeString = getTime(chargingTime)
  const dischargingTimeString = getTime(dischargingTime)

  return (
    <>
      <div className='battery'>
        <div className='battery-percentage'>{batteryPercentage}%</div>

        <div
          className={`battery-area ${charging ? 'battery-charging' : ''}`}
          style={{ height: `${batteryPercentage}%` }}
        />

        {charging && <div className='charging-icon charging-icon-show'>⚡</div>}
      </div>

      <p>Charging time: {chargingTimeString}</p>
      <p>Discharging time: {dischargingTimeString}</p>
    </>
  )
}

export default Battery
