import * as dayjs from 'dayjs'

export const getTime = (time: number) => {
  return time === Infinity ? 'Unknown' : dayjs.unix(time).format('HH:mm')
}
