import React from "react";
import HostService from "../_services/host.service";
import { history } from "../_helpers/history";
import metricService from "../_services/metric.service";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import thresholdService from "../_services/threshold.service";

class AddThreshold extends React.Component{
    constructor(props){
        super(props);
        // hostname metricname threshold
        this.state = {
            hostname: "",
            metricname: "",
            threshold: "",
            hostList: [],
            metricList: [],
        }
    }

    componentDidMount(){
        HostService.getAllHost().then(
            res => {
                console.log(res)
                this.setState({
                    hostList: res
                });
            }
        );
        metricService.getAlerts().then(
            res => {
                console.log(res)
                this.setState({
                    metricList: res
                });
            }
        );
    }

    AddThreshold(){
        console.log(this.state.hostname, this.state.metricname, this.state.threshold);
        thresholdService.addThreshold(this.state.hostname, this.state.metricname, this.state.threshold).then(
            res => {
                console.log(res);
                history.push("/admin/metrics");
                window.location.reload();
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    render(){
        const { hostname, metricname, threshold, hostList, metricList } = this.state;
        return(
            <div>
                <h1>Configure Page</h1>
                <Formik 
                    initialValues={{
                        hostname: "",
                        metricname : "",
                        threshold: "",
                    }}
                    validationSchema={Yup.object().shape({
                        hostname: Yup.string().required('hostname is required'),
                        metricname: Yup.string().required('metricname is required'),
                        threshold: Yup.string().required('threshold is required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true);
                        this.setState(
                            {
                                hostname: values.hostname,
                                metricname: values.metricname,
                                threshold: values.threshold,
                            }
                            ,() => {
                                this.AddThreshold()
                            }
                        )
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="form-group"> 
                                <label htmlFor="hostname">Hostname</label>
                                <Field name="hostname" type="select" className="form-control">
                                    <option value="">Select Host</option>
                                    {this.state.hostList.map(host =>
                                        <option key={host.hostname} value={host.hostname}>{host.hostname}</option>
                                    )}
                                </Field>
                                <ErrorMessage name="hostname" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="metricname">Metricname</label>
                                <Field name="metricname" type="select" className="form-control">
                                    <option value="">Select Metric</option>
                                    {this.state.metricList.map(metric =>
                                        <option key={metric.metricname} value={metric.metricname}>{metric.metricname}</option>
                                    )}
                                </Field>
                                <ErrorMessage name="metricname" component="div" className="invalid-feedback" />
                            </div>                  
                            <div className="form-group">
                                <label htmlFor="threshold">Threshold</label>
                                <Field name="threshold" type="text" className="form-control" />
                                <ErrorMessage name="threshold" component="div" />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

export { AddThreshold };