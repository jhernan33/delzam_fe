import axios from "axios";

export default axios.create({
    // baseURL: "http://192.168.0.101:8083/siam",
    baseURL: "http://159.223.168.118:8082/siam",
    headers: {
      //"Access-Control-Allow-Origin": "*",
      // "Content-type": "application/json",
      //'Accept': 'application/json', 
      //'Content-Type': 'application/json'
    }
  });
  