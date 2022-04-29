import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Area } from "recharts";
import influxService from "../_services/influx.service";

const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#8884d8", "#ff4454"]

class GraphPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      hostList: [
        "paavan-Inspiron-5584",
        "aquib-HP-Laptop-15-bs0xx",
        "rsr-pc",
        "chaithanya-G3-3579",
      ],
      applicationList: [
        "cpu",
        "mem",
        "postgresql"
      ],
      metricList: [
        "usage_system",
        "usage_iowait",
        "usage_user",
        "available_percent",
        "used_percent",
        "active",
        "cached",
        "tup_returned",
        "tup_fetched",
        "tup_inserted",
        "tup_updated",
      ],
      startTime: '-30d',
      endTime: '-20d',
      parameter: 'cpu',
      selectedHostList: [],
      selectedMetricList: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    // get data from influxservice 
  }

  getData() {
    console.log(this.state.selectedHostList,this.state.selectedMetricList)
    influxService.getData(this.state.selectedHostList, this.state.selectedMetricList, this.state.startTime, this.state.endTime
      , this.state.parameter
    ).then(data => {
      this.setState({
        data: data,
        isLoaded: true
      },() => console.log(this.state.data))
    })
  }

  render() {
    const { data, hostList,applicationList,metricList, startTime, endTime, parameter, selectedHostList,selectedMetricList,isLoaded} = this.state;
    let color = "#ffffff"
    return (
      // form component to select start and end times
      <div>
        <h1> GRAPHS </h1>
        <Formik
          initialValues={{
            startTime: '-30d',
            endTime: '-20d',
            parameter: "cpu",
            selectedHostList: [],
            selectedMetricList: [],
          }}
          validationSchema={Yup.object().shape({
            startTime: Yup.string().required('Start time is required'),
            endTime: Yup.string().required('End time is required'),
            parameter: Yup.string().required('Parameter is required'),
            selectedHostList: Yup.array().required('Host is required'),
            selectedMetricList: Yup.array().required('Metric is required'),
          })}
          onSubmit={({ startTime, endTime, parameter, selectedHostList, selectedMetricList }, { setStatus, setSubmitting }) => {
            setStatus();
            this.setState({
              startTime: startTime,
              endTime: endTime,
              parameter: parameter,
              selectedHostList: selectedHostList,
              selectedMetricList: selectedMetricList,
              isLoaded: false
            }, () => {
              this.getData();
            });
          }}
          render={({ errors, status, touched, isSubmitting }) => (
            <Form>
              <div className="form-group">
                <div className='form-group'>
                  <label htmlFor="startTime">Start Time</label>
                  <Field name="startTime" as="select" className={'form-control' + (errors.startTime && touched.startTime ? ' is-invalid' : '')}>
                    <option value={"-30d"}>30 days from now</option>
                    <option value={"-20d"}>20 days from now</option>
                    <option value={"-5d"}> 5 days from now</option>
                    <option value={"-1d"}> 1 day from now</option>
                    <option value={"-1h"}> 1 hour from now</option>
                    <option value={"-1m"}> 1 minute from now</option>
                  </Field>
                  <ErrorMessage name="startTime" component="div" className="invalid-feedback" />
                </div>
                <div className='form-group'>
                  <label htmlFor="endTime">End Time</label>
                  <Field name="endTime" as="select" className={'form-control' + (errors.endTime && touched.endTime ? ' is-invalid' : '')}>
                    <option value={"-30d"}>30 days from now</option>
                    <option value={"-20d"}>20 days from now</option>
                    <option value={"-5d"}> 5 days from now</option>
                    <option value={"-1d"}> 1 day from now</option>
                    <option value={"-1h"}> 1 hour from now</option>
                    <option value={"-1m"}> 1 minute from now</option>
                  </Field>
                  <ErrorMessage name="endTime" component="div" className="invalid-feedback" />
                </div>
                <div className='form-group'>
                  <label htmlFor="parameter">Parameter</label>
                  <Field name="parameter" as="select" className={'form-control' + (errors.parameter && touched.parameter ? ' is-invalid' : '')}>
                    {applicationList.map((application, index) =>
                      <option key={index} value={application}>{application}</option>
                    )}
                  </Field>
                  <ErrorMessage name="parameter" component="div" className="invalid-feedback" />
                </div>
                <div className='form-group'>
                  <label htmlFor="selectedHostList">Hosts</label>
                  <Field name="selectedHostList" as="select" className={'form-control' + (errors.selectedHostList && touched.selectedHostList ? ' is-invalid' : '')} multiple>
                    {hostList.map((host, index) =>
                      <option key={index} value={host}>{host}</option>
                    )}
                  </Field>
                  <ErrorMessage name="selectedHostList" component="div" className="invalid-feedback" />
                </div>
                <div className='form-group'>
                  <label htmlFor="selectedMetricList">Metrics</label>
                  <Field name="selectedMetricList" as="select" className={'form-control' + (errors.selectedMetricList && touched.selectedMetricList ? ' is-invalid' : '')} multiple>
                    {metricList.map((metric, index) =>
                      <option key={index} value={metric}>{metric}</option>
                    )}
                  </Field>
                  <ErrorMessage name="selectedMetricList" component="div" className="invalid-feedback" />
                </div>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary mr-2">SELECT</button>
              </div>
            </Form>
          )}
        />

        {isLoaded &&
          <div>{parameter}</div> &&
          selectedMetricList.map(
            (metric, index) => {
              if (data[metric].length != 0)
                return (
                  <div key={index}>
                    <h3>{metric}</h3>
                    <ComposedChart width={900} height={400} data={data[metric]}>
                      {selectedHostList.map((el, idx) =>
                        <Line
                          key={idx}
                          type="monotone"
                          stroke={colors[idx % colors.length]}
                          activeDot={{ r: 4 }}
                          dataKey={el} />
                      )}
                      <CartesianGrid />
                      <XAxis hide dataKey="time" />
                      <YAxis />
                      <Legend verticalAlign="top" height={30} />
                      <Tooltip />
                    </ComposedChart>
                  </div>
                )
              else
                return <div key={index}></div>;
            }
          )}
      </div>
    );
  }
}

export { GraphPage };