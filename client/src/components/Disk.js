import React from 'react';

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
function Disk(props) {
	//const { diskWidgetId, fsTotal, fsUsed, fsUsage } = props.diskData;
	const { fsTotal, fsUsed, fsUsage } = props.diskData;
	return (
		<div className="memory_main">
			<div className = "mem_wrapper">
				<div className = "mem_wrapper_main">
					<div className="mem_circle">
          	<CircularProgressbarWithChildren
            	value={fsUsage}
           		background
            	backgroundPadding={6}
            	styles={buildStyles({
              backgroundColor: "#FFD27B",
              textColor: "#fff",
              pathColor: "#fff",
              trailColor: "#FFE8BA",
            	})}
          	>
          		<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-hdd-rack-fill" viewBox="0 0 16 16">
								<path d="M2 2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1v2H2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-1V7h1a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm.5 3a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm-2 7a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zM12 7v2H4V7h8z"/>
							</svg>
          	</CircularProgressbarWithChildren>
          </div>
					<div className="mem_data">
						<div className="cpu_data_perc">
            	<span className="cpu_data_num">
              	{fsUsage}
            	</span>
           		<span className="cpu_data_num_per">%</span>
          	</div>
          	<div className="cpu_data_info">
            	<div className="cpu_data_cpus">
              	<span className="cpu_data_label">Total Disk Space:</span>
        					<span className="cpu_data_data">
          					{fsTotal}GB
        					</span>
      				</div>
      				<div className="cpu_data_cpus">
        				<span className="cpu_data_label">Used Disk Space:</span>
        				<span className="cpu_data_data">
          				{(fsTotal)-(fsTotal - fsUsed)}GB
        				</span>
      				</div>
      				<div className="cpu_data_cpus">
        				<span className="cpu_data_label">Free Disk Space:</span>
        				<span className="cpu_data_data">
          				{fsTotal - fsUsed}GB
        				</span>
      				</div>
  					</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Disk;