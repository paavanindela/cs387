import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Area } from "recharts";
import influxService from "../_services/influx.service";

const url = 'http://localhost:5000/query/'

const colors = ["#1f77b4", "#ff7f0e", "#2ca02c","#8884d8", "#ff4454"]

class CpuPage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      data: [],
      hostList: [
        "paavan-Inspiron-5584",
        "aquib-HP-Laptop-15-bs0xx",
        "rsr-pc",
        "chaithanya-G3-3579",    
      ],
      isLoaded: false
    };
  }

  componentDidMount(){
    // get data from influxservice 
    influxService.getCpu(this.state.hostList).then(data => {
      this.setState({
        data: data,
        isLoaded: true
      })
    })
  }
  
  render(){
    const {isLoaded,hostList,data} = this.state;
    let color = "#ffffff"
    if(!isLoaded) return <div className="sweet-loading">
      <ClipLoader color={color} loading={!isLoaded} size={150} />
    </div>;
      return (
          <ComposedChart width={900} height={400} data={data}>
            {hostList.map( (el,idx) =>
              <Line 
              key = {idx}
              type="monotone" 
              stroke={colors[idx%colors.length]}
              activeDot={{ r: 4 }} 
              dataKey={el}/>
            )}
            <CartesianGrid />
            <XAxis hide dataKey="time"/>
            <YAxis />
            <Legend verticalAlign="top" height={30} />
            <Tooltip />
          </ComposedChart>
      );
  }
}

export {CpuPage};