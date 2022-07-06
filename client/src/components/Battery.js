import React from 'react';
import { useBattery } from "react-use";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
function Battery(props) {
    //console.log(props);
    const batteryState = useBattery();
    console.log(batteryState);
    let batteryPercent = Math.round(batteryState.level * 100);
    let batteryStatusClass = "";
    if (batteryState.charging) {
        batteryStatusClass = "battery charging";
    }
    else if (batteryState.level === 1) {
        batteryStatusClass = "battery full";
    }
    else{
        batteryStatusClass = "battery not charging"
    }
    const battery = batteryState.isSupported? ( 
        <div className = "memory_main" >
            <div className = "mem_wrapper">
                <div className = "mem_wrapper_main">
                    <div className="mem_circle">
                        <CircularProgressbarWithChildren
                            value={batteryPercent}
                            background
                            backgroundPadding={6}
                            styles={buildStyles({
                                backgroundColor: "#FFD27B",
                                textColor: "#fff",
                                pathColor: "#fff",
                                trailColor: "#FFE8BA",
                            })}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-battery" viewBox="0 0 16 16">
                                <path d="M0 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6zm2-1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H2zm14 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8z"/>
                            </svg>
                        </CircularProgressbarWithChildren>
                    </div>
                    <div className = 'mem_data'>
                        <div className="cpu_data_perc">
                            <span className="cpu_data_num">
                                {batteryPercent}
                            </span>
                            <span className="cpu_data_num_per">%</span>
                        </div>
                        <div className="cpu_data_info">
                            <span className="b1">Charging Info:</span>
                            <span className="b1">
                                {batteryStatusClass}
                            </span>                            
                        </div>
                        <div className="cpu_data_info">
                            {batteryPercent <= 20 && (
                                <div className="battery_health">
                                    Your battery is getting low, save your work and{" "}
                                    <strong>connect your charger</strong> now
                                </div>
                            )}
                            {batteryPercent > 20 && (
                                <div className="battery_health">
                                    Your battery is in{" "}
                                    <strong>good condition</strong>
                                </div>
                            )}
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    ) : ( 
        <div> Device has no battery </div>
    );
    return ( 
        <div>
            { battery }
        </div>
    );
}

export default Battery;