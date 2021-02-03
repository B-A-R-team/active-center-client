/*
 * @Author: lts
 * @Date: 2021-02-03 18:23:41
 * @LastEditTime: 2021-02-03 20:52:25
 * @FilePath: \active-center-client\src\views\admin\signIn\personSignIn\getPerSign.js
 */
import { FORMAT_DATA } from '../../../../utils/constantsUtil'
import moment from 'moment'
import { changeDayTimeArr } from '../../../../utils/timeUtil'
import { getFirstAndEndDayOfWeek } from '../../../../utils/getStartAndEndUtil'
const getMidDate = () => {
    const { startTime, endTime } = getFirstAndEndDayOfWeek()
    return changeDayTimeArr([startTime, endTime])

}
export const getPerSignInfo = (myArr) => {
    let tempArr = getMidDate()
    let signCount = 0
    myArr = myArr.map((item, index) => {
        if (item[0]) {
            signCount++
            let date = new Date(item[0])
            return (moment(date.getTime()).format(FORMAT_DATA)).substr(11)
        } else {
            return tempArr[index].substr(11)
        }
    })
    let signRate = ((signCount/7).toFixed(4)*100).toString() + '%'

    let nowArr = myArr.filter(item => item !== '00:00')
    let earlyTime = nowArr[0]
    let lastTime = nowArr[0]
    for (let i = 0; i < nowArr.length; i++) {
        if(nowArr[i+1]<nowArr[i]&&i<nowArr.length-1) {
            earlyTime = nowArr[i+1]
        }
        if(nowArr[i+1]>nowArr[i]&&nowArr.length-1) {
            lastTime = nowArr[i+1]
        }
    }
    if(!earlyTime || !lastTime) {
        earlyTime = '本周还没有签到过~'
        lastTime = '本周还没有签到过~'
    }
    return {
        signCount,
        signRate,
        earlyTime,
        lastTime
    }
}