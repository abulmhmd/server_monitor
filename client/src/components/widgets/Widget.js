import React, { useState, useEffect } from "react";

import Cpu from "../Cpu";
import Memory from "../Memory";
import Info from "../Info";
import Battery from "../Battery";
import Disk from "../Disk";
import Network from "../Network";


export default function Widget(props) {
  const [performanceData, setPerformanceData] = useState({});

  useEffect(() => {
    setPerformanceData(props.data);
  }, [props.data]);
  
  const {
    freeMem,
    totalMem,
    memUsage,
    osType,
    uptime,
    cpuModel,
    cpuSpeed,
    numCpus,
    cpuLoad,
    usedMem,
    isActive,
    macA,
    fsTotal,
    fsUsed,
    fsUsage,
    battery,
    network,
    Arch,
  } = performanceData;

  const cpu = { cpuLoad, numCpus, cpuSpeed, cpuModel, Arch };
  const mem = { freeMem, totalMem, memUsage, usedMem };
  const info = { osType, uptime, cpuModel, cpuSpeed, numCpus, isActive, macA};
  //const diskWidgetId = `disk-widget-${macA}`.replace(/:/g, '');
  //const disk = { diskWidgetId, fsTotal, fsUsed, fsUsage };
  const disk = { fsTotal, fsUsed, fsUsage };

  //let notActiveDiv = "";

  // if (!isActive) {
  //   return null;
  // }

  return (
    <div className="widget_main">
      <h3>
        MAC Address: {macA} -{" "}
        {!isActive ? (
          <span style={{ color: "red" }}>Offline</span>
        ) : (
          <span style={{ color: "green" }}>Online</span>
        )}
      </h3>
      <div className="widget_wrapper">
        <Memory memData={mem} />
        <Cpu cpuData={cpu} />
        <Disk diskData = {disk}/> 
      </div>
      <span className = 'separator mx-auto my-4' > </span>
      <div className = 'widget_wrapper' >
        <Info infoData={info} />
        <Battery batteryData = {battery} />
        <Network netData = {network} />
      </div>
    </div>
  );
}
