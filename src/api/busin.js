import * as API from '.'
export default {
    alarmGroupMonth : params =>{   // 月报警趋势
        return API.POST('alarm/alarmGroupMonth',params)
    },
    alarmOfMachineTop : params =>{ // 设备报警排名
        return API.POST('alarm/alarmOfMachineTop',params)
    },
   alarmTypeTop : params =>{ // 设备报警类型排名
        return API.POST('alarm/alarmTypeTop',params)
    },
    findMachineListByExample : params =>{ // 设备报警类型排名
        return API.POST('alarm/findMachineListByExample',params)
    },
    outputOfMachineTop : params =>{ // 设备报警类型排名
        return API.POST('alarm/outputOfMachineTop',params)
    },
    statistics : params =>{ // 设备报警类型排名
        return API.POST('alarm/statistics',params)
    },
}