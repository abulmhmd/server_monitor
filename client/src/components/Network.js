//import './App.css';
import {useState,useEffect} from 'react'
import axios from 'axios'

function Network() {
  //creating IP state'
  const localIpAddress = require("../lib")
  console.log(localIpAddress())

  const [ip, setIP] = useState('');

  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data);
    setIP(res.data.IPv4)
  }
  
  useEffect( () => {
    //passing getData method to the lifecycle method
    getData()

  }, [])

  return (
    <div>
      <div className="info_main">
        <div className="os">
          <span>Your Location IP Address is</span>
          <span id="os_name">{ip}</span>
        </div>
        <div className="os">
          <span>IPv4 Address</span>
          <span id="os_name">{localIpAddress}</span>
          <span id="os_name">192.168.195.231</span>
        </div>
      </div>
    </div>
  );
}

export default Network;