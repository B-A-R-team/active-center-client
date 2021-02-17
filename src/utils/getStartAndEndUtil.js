/*
 * @Author: lts
 * @Date: 2021-01-25 15:09:19
 * @LastEditTime: 2021-02-12 15:32:13
 * @FilePath: \active-center-client\src\utils\getStartAndEndUtil.js
 */
import moment from 'moment'
import { FORMAT_DATA } from './constantsUtil'
export const getFirstAndEndDayOfWeek = () => {  
   let date = new Date()
   let endDate = new Date()
   let day = (date.getDay() === 0 ? 7 : date.getDay())
   endDate.setDate(date.getDate() - day + 7)
   date.setDate(date.getDate() - day + 1)
   date.setHours(0, 0, 0, 0)
   return { startTime: moment(date.getTime()).format(FORMAT_DATA), endTime: moment(endDate.getTime()).format(FORMAT_DATA) }
}
export const getFirstAndEndDayOfMonth = () => {
   let date = new Date()
   date.setDate(1)
   let endDate = new Date()
   endDate.setMonth(endDate.getMonth() + 1)
   endDate.setDate(0)
   date.setHours(0, 0, 0, 0)
   return { startTime: moment(date.getTime()).format(FORMAT_DATA), endTime: moment(endDate.getTime()).format(FORMAT_DATA) }
}
export const getFirstAndEndDayOfYear = () => {
   let date = new Date()
   let endDate = new Date()
   date.setDate(1);
   date.setMonth(0);
   date.setHours(0, 0, 0, 0)
   endDate.setMonth(11)
   endDate.setDate(31)

   return { startTime: moment(date.getTime()).format(FORMAT_DATA), endTime: moment(endDate.getTime()).format(FORMAT_DATA) }
}