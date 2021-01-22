/*
 * @Author: lts
 * @Date: 2021-01-22 08:14:49
 * @LastEditTime: 2021-01-22 11:04:08
 * @FilePath: \active-center-client\src\utils\timeUtil.js
 */
import moment from 'moment'
import { FORMAT_DATA } from './constantsUtil'
export const  getFirstDayOfWeek = () => {
   let date = new Date()
   date.setDate(date.getDate() - date.getDay() + 1)
   date.setHours(0,0,0,0)
   return moment(date.getTime()).format(FORMAT_DATA)
}
export const getFirstDayOfMonth = () => {
   let date = new Date()
   date.setDate(1)
   date.setHours(0,0,0,0)
   return moment(date.getTime()).format(FORMAT_DATA)
}
export const getFirstDayOfYear = () => {
   let date = new Date()
   date.setDate(1);
   date.setMonth(0);
   date.setHours(0,0,0,0)
   return moment(date.getTime()).format(FORMAT_DATA)
}  