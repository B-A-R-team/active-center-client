/*
 * @Author: lts
 * @Date: 2021-01-22 08:14:49
 * @LastEditTime: 2021-01-27 13:21:07
 * @FilePath: \active-center-client\src\utils\timeUtil.js
 */
import moment from 'moment'
import { FORMAT_DATA } from './constantsUtil'
export const getFirstDayOfWeek = () => {
   let date = new Date()
   date.setDate(date.getDate() - date.getDay() + 1)
   date.setHours(0, 0, 0, 0)
   return moment(date.getTime()).format(FORMAT_DATA)
}
export const getFirstDayOfMonth = () => {
   let date = new Date()
   date.setDate(1)
   date.setHours(0, 0, 0, 0)
   return moment(date.getTime()).format(FORMAT_DATA)
}
export const getFirstDayOfYear = () => {
   let date = new Date()
   date.setDate(1);
   date.setMonth(0);
   date.setHours(0, 0, 0, 0)
   return moment(date.getTime()).format(FORMAT_DATA)
}
export const daysChangeMonthsArr = (days) => {
   let spiltNum = []
   let splitNum2 = []
   for (let i = 0; i < 12; i++) {
      let date = new Date()
      date.setMonth(i + 1)
      date.setDate(0)
      spiltNum.push(date.getDate())
   }

  spiltNum.reduce(function (accumulator, currentValue) {
      splitNum2.push(accumulator)
      return accumulator + currentValue;
   });
   let myArr = [[], [], [], [], [], [], [], [], [], [], [], []]
   for (let i = 0; i < myArr.length; i++) {
      for (let j = 0; j < days.length; j++) {
         if(splitNum2.find(item => item === j)) {
            i++
         }
         myArr[i].push(days[j])
      }
   }
   return myArr
}

/**
 * @description: 用于获取开始时间和结束时间中间的日期
 * @param {Array} arr 开始结束时间数组 ["2021-01-31", "2021-02-03"]
 * @return {Array} 返回这个开始时间和结束时间中间的日期
 */
export const  changeDayTimeArr = (arr) => {
   // console.log(arr)
   
   let startDate = new Date(arr[0])
   let endDate = new Date(arr[1])
   let date = new Date(arr[0])
   let xArr = [moment(date.getTime()).format(FORMAT_DATA)]
   let days = (endDate.getTime() - startDate.getTime())/1000/3600/24

   console.log(days)
   for (let i = 0; i < days; i++) {
      console.log(111)
      date.setDate(date.getDate() + 1)
      console.log(moment(date.getTime()).format(FORMAT_DATA))
      xArr.push(moment(date.getTime()).format(FORMAT_DATA))
   }
   console.log(xArr)
   return xArr
}