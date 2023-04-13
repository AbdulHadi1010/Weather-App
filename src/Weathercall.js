import React from 'react'
import { Text, View } from 'react-native'
import axios from 'axios';

export default function Weathercall() {
    // const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://api.openweathermap.org/data/2.5/weather?lat=31.58&lon=74.32&appid=134bcc17ff7fbd17a3ec89f642825260',
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
  return (
    
        <Text>This is the API call file</Text>
  )
}
