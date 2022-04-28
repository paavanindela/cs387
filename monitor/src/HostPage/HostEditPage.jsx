import React from "react";
import HostService from "../_services/host.service";
import { history } from '../_helpers/history';

class HostEditPage extends React.Component{
    constructor(props) {
        super(props);
        // get host from url
        const hostname = this.props.match.params.hostname;
        this.state = {
            host: hostname,
            status: false
        };
    }

    componentDidMount() {
        HostService.getHost(this.state.host).then(
            res => {
                this.setState({
                    host: res,
                    status: true
                });
            }
        );
    }

    render() {
        const { host, status } = this.state;
        if(!status) {
            return <div>
                Loading...
            </div>;
        }
        return (
            <div>
                <h2>Add a Host</h2>
                <Formik
                    initialValues={{
                        hostname: host.hostname,
                        ip: host.ip,
                        mac: host.mac,
                        os: host.os,
                        influx: host.influx,
                    }}
                    validationSchema={Yup.object().shape({
                        hostname: Yup.string().required('hostname is required'),
                        ip: Yup.string().required("IP Addr is required"),
                        mac: Yup.string().required("MAC Addr is required"),
                        os: Yup.number().required("OS Type is required"),
                        influx: Yup.boolean().required("Status of Influx is required")
                    })}
                    onSubmit={({ hostname, ip, mac, os, influx }, { setStatus, setSubmitting }) => {
                        setStatus();
                        HostService.modifyHost(host.hostname, hostname, ip, mac, os, influx)
                            .then(
                                user => {
                                    history.push('/adminhost');
                                    window.location.reload();
                                }
                            );
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="hostname">Hostname</label>
                                <Field name="hostname" type="text" className={'form-control' + (errors.hostname && touched.hostname ? ' is-invalid' : '')} />
                                <ErrorMessage name="hostname" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="ip">IP</label>
                                <Field name="ip" type="text" className={'form-control' + (errors.ip && touched.ip ? ' is-invalid' : '')} />
                                <ErrorMessage name="ip" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="mac">MAC</label>
                                <Field name="mac" type="text" className={'form-control' + (errors.mac && touched.mac ? ' is-invalid' : '')} />
                                <ErrorMessage name="mac" component="div" className="invalid-feedback" />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="os">OS</label>
                                <Field name="os" as="select" className={'form-control' + (errors.os && touched.os ? ' is-invalid' : '')}>
                                    <option value={1}>Windows</option>
                                    <option value={2}>Linux</option>
                                    <option value={3}>Mac</option>
                                </Field>
                                <ErrorMessage name="os" component="div" className="invalid-feedback" />
                            </div>                         
                            <div className="form-group">
                                <label htmlFor="influx">Influx</label>
                                <Field name="influx" type="checkbox" className={'form-control' + (errors.influx && touched.influx ? ' is-invalid' : '')} />
                                <ErrorMessage name="influx" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    Add
                                </button>
                                {isSubmitting &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                            {status &&
                                <div className={'alert alert-danger'}>{status}</div>
                            }
                        </Form>
                    )}
                />
                <p></p>
                <button onClick={() => history.back()} className="btn btn-secondary">Back</button>
            </div>
        );
    }
}

export {HostEditPage};