import React, { useState, useEffect } from "react";
import "./App.css";
import socket from "./utilities/socketConnection";

import Widget from "./components/widgets/Widget";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navigation/Navbar.js";

function App() {
  const [performanceData, setPerformanceData] = useState({});
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    socket.on("data", (data) => {
      performanceData[data.macA] = data;
      setPerformanceData(performanceData);
      console.log(performanceData);
      let widgets_ = [];

      Object.entries(performanceData).forEach(([key, value]) => {
        widgets_.push(<Widget key={key} data={value} />);
      });

      setWidgets(widgets_);
    });
  }, [performanceData]);

  return (
    <div className="App">
      <Navbar />
      {widgets}
    </div>
  );
}

export default App;
