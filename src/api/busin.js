import * as API from ".";
export default {
  alarmGroupMonth: params => {
    // 月报警趋势
    return API.POST("alarm/alarmGroupMonth", params);
  },
  alarmOfMachineTop: params => {
    // 设备报警排名
    return API.POST("alarm/alarmOfMachineTop", params);
  },
  alarmTypeTop: params => {
    // 设备报警类型排名
    return API.POST("alarm/alarmTypeTop", params);
  },
  findMachineListByExample: params => {
    // 查询企业内设备（车间名、设备数量、各状态设备数量【作业、待机、报警】）
    return API.POST("alarm/findMachineListByExample", params);
  },
  outputOfMachineTop: params => {
    // 各设备产量排名【limit true，cId false】
    return API.POST("alarm/outputOfMachineTop", params);
  },
  statistics: params => {
    // 宏观信息 总车间数、设备数、闲置数量、作业数、待机数、报警数、总产量、利用率、故障率
    return API.POST("alarm/statistics", params);
  },
  findMachineInfoByExample: params => {
    // 询机器基本信息（设备名、品牌、型号、出厂日期、外形尺寸、用途）
    return API.POST("machine/findMachineInfoByExample", params);
  },
  findProductionSituationByMachine: params => {
    //查询机器本次作业情况信息（产量、回退、设备运行时长、运行效率）
    return API.POST("machine/findProductionSituationByMachine", params);
  },
  groupByMonth: () => {
    //生产月报
    return API.GET("es/groupByMonth");
  },
  groupByDate: () => {
    //生产日报
    return API.GET("es/groupByDate");
  },
  ThisTimeAlarmInfo: params => {
    //查询机器本次作业情况信息（产量、回退、设备运行时长、运行效率）
    return API.POST("alarm/ThisTimeAlarmInfo", params);
  },
  sumRtimeOfMachineTop: params => {
    return API.POST("machine/sumRtimeOfMachineTop", params);
  },
  findMachineListByWsId: params => {
    return API.POST("alarm/findMachineListByWsId", params);
  },
  // 根据公司查询公司内各车间信息（车间名、设备数量、各状态设备数量【作业、待机、报警】）
  findMachineListByCompany: params => {
    return API.POST("alarm/findMachineListByCompany", params);
  },
  // 根据车间编号查询车间信息（车间名、dpuCode、状态）
  findMachineByWsId: params => {
    return API.POST("alarm/findMachineByWsId", params);
  }
};
