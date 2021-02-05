/*
 * @Author: lts
 * @Date: 2021-01-25 15:09:19
<<<<<<< HEAD
 * @LastEditTime: 2021-01-31 09:53:44
=======
 * @LastEditTime: 2021-02-02 20:16:55
>>>>>>> cd8120f33f4d921acee19d3f3124d0ef4adb809c
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
   endDate.setDate(31)
   endDate.setMonth(11)

   return { startTime: moment(date.getTime()).format(FORMAT_DATA), endTime: moment(endDate.getTime()).format(FORMAT_DATA) }
}