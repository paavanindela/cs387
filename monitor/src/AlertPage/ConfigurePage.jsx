import React from "react";
import HostService from "../_services/host.service";
import { history } from "../_helpers/history";
import metricService from "../_services/metric.service";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import thresholdService from "../_services/threshold.service";

class AddThreshold extends React.Component {
    constructor(props) {
        super(props);
        // hostname metricname threshold
        this.state = {
            hostname: "",
            metricname: "",
            threshold: "",
            hostList: [],
            metricList: [],
            error: "",
        }
    }

    componentDidMount() {
        HostService.getAllHost().then(
            res => {
                // console.log(res)
                this.setState({
                    hostList: res
                });
            }
        );
        metricService.getAlerts().then(
            res => {
                // console.log(res)
                this.setState({
                    metricList: res
                });
            }
        );
    }

    AddThreshold() {
        // console.log(this.state.hostname, this.state.metricname, this.state.threshold);
        thresholdService.addThreshold(this.state.hostname, this.state.metricname, this.state.threshold).then(
            res => {
                // console.log(res);
                history.push('/alerts/view');
                window.location.reload();
            }
        ).catch(
            err => {
                console.log(err);
                this.setState({
                    error: err.message
                });
                // window.location.reload();
            }
        );
    }

    render() {
        const { hostname, metricname, threshold, hostList, metricList,error } = this.state;
        return (
            <div>
                    <div style={{alignItems:'center',textAlign:'center'}} >
                <h1>Configure Page</h1></div>
                { error!="" && <div className="alert alert-danger">{error}</div>
                    && <button className="btn btn-primary" onClick={() => history.back()}>Error Occured! Go Back</button>
                }
                {error=="" &&
                <Formik
                    initialValues={{
                        hostname: "",
                        metricname: "",
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
                            , () => {
                                this.AddThreshold();
                            }
                        )
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form style={{alignItems:"center",textAlign:'center',margin:'5%'}}>
                            <div className="form-group"> 
                                <label htmlFor="hostname">Hostname</label>
                                &nbsp;&nbsp;
                                <Field name="hostname" as="select" className="form-control">
                                    <option key="#" value="">Select Host</option>
                                    {this.state.hostList.map(host =>
                                        <option key={host.hostname} value={host.hostname}>{host.hostname}</option>
                                    )}
                                </Field>
                                <ErrorMessage name="hostname" component="div" className="invalid-feedback" />
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="metricname">Metricname</label>
                                &nbsp;&nbsp;
                                <Field name="metricname" as="select" className="form-control">
                                    <option key="#" value="">Select Metric</option>
                                    {this.state.metricList.map(metric =>
                                        <option key={metric.name} value={metric.name}>{metric.name}</option>
                                    )}
                                </Field>
                                <ErrorMessage name="metricname" component="div" className="invalid-feedback" />
                            </div>                  
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="threshold">Threshold</label>
                                &nbsp;&nbsp;
                                <Field name="threshold" type="text" className="form-control" />
                                <ErrorMessage name="threshold" component="div" />
                            </div>
                            <br></br>
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>}
            </div>
        );
    }
}

class ViewThreshold extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thresholdList: [],
            status: false,
        }
    }

    componentDidMount() {
        thresholdService.getThresholds().then(
            res => {
                this.setState({
                    thresholdList: res,
                    status: true
                });
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    modifyThreshold(id) {
        let threshold = this.state.thresholdList[id];
        // console.log(threshold);
        history.push("/alerts/modify/" + threshold.hostname + "/" + threshold.metricname);
        window.location.reload();
    }

    deleteThreshold(id) {
        let threshold = this.state.thresholdList[id];
        thresholdService.deleteThreshold(threshold.hostname, threshold.metricname).then(
            res => {
                // console.log(res);
                window.location.reload();
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    render() {
        const { thresholdList, status } = this.state;
        return (
            <div>
                    <div style={{alignItems:'center',textAlign:'center'}} >
                <h1>View Thresholds</h1></div>
                {status ?
                    <div>
                        <table className="table table-striped" style={{width:'100%',border:"1px solid black"}}>
                            <thead style={{border:"1px solid black"}}>
                                <tr style={{border:"1px solid black"}}>
                                    <th style={{border:"1px solid black"}}>Hostname</th>
                                    <th style={{border:"1px solid black"}}>Metricname</th>
                                    <th style={{border:"1px solid black"}}>Threshold</th>
                                    <th style={{border:"1px solid black"}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {thresholdList.map((threshold, id) =>
                                    <tr key={id}  style={{border:"1px solid black",borderRadius:'5px'}}>
                                        <td style={{border:"1px solid black",borderRadius:'5px',textAlign:'center'}}>{threshold.hostname}</td>
                                        <td style={{border:"1px solid black",borderRadius:'5px',textAlign:'center'}}>{threshold.metricname}</td>
                                        <td style={{border:"1px solid black",borderRadius:'5px',textAlign:'center'}}>{threshold.threshold}</td>
                                        <td style={{border:"1px solid black",borderRadius:'5px',textAlign:'center'}}>
                                            <button className="btn btn-danger" onClick={() => {
                                                this.deleteThreshold(id)
                                            }}>Delete</button>&nbsp;&nbsp;
                                            <button className="btn btn-warning" onClick={() => {
                                                this.modifyThreshold(id)
                                            }}>Edit</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    :
                    <div>
                        Loading...
                    </div>
                }
            </div>
        );
    }

}

class ModifyThreshold extends React.Component {
    constructor(props) {
        super(props);
        // pathname
        const pathname = window.location.pathname
        // pathname = "/alerts/modify/hostname/metricname"
        const hostname = pathname.split("/")[3];
        const metricname = pathname.split("/")[4];
        this.state = {
            hostname: hostname,
            metricname: metricname,
            threshold: 0,
        }
    }

    componentDidMount() {
    }

    modifyThreshold() {
        thresholdService.modifyThreshold(this.state.hostname, this.state.metricname, this.state.threshold).then(
            res => {
                // console.log(res);
                history.push("/alerts/view");
                window.location.reload();
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    render() {
        const { hostname, metricname, threshold } = this.state;
        return (
            <div>
                <h1>Modify Threshold</h1>
                <div>{hostname}<br></br>
                    {metricname}</div>
                <Formik
                    initialValues={{
                        threshold: 0,
                    }}
                    validationSchema={Yup.object().shape({
                        threshold: Yup.number()
                            .min(0, "Threshold must be greater than 0")
                            .required("Threshold is required"),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true);
                        this.setState(
                            {
                                threshold: values.threshold,
                            }
                            , () => {
                                this.modifyThreshold()
                            }
                        )
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
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

export { AddThreshold, ViewThreshold, ModifyThreshold };