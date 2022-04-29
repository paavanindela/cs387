import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React from "react";
import { history } from '../_helpers/history';
import applicationService from '../_services/application.service';

class AddApplicationPage extends React.Component {
    constructor(props) {
        super(props);
        var hname = window.location.pathname.split('/')[3];
        console.log(hname);
        this.state = {
            hname
        }
    }
    render() {
        return (
            <div>
                <h2>Add a Application</h2>
                <Formik
                    initialValues={{
                        status: true,
                        name: '',
                        owner: ''
                        
                    }}
                    validationSchema={Yup.object().shape({
                        
                        name: Yup.string().required("Name is required"),
                        
                        owner: Yup.string().required("Owner is required"),
                        status: Yup.boolean().required("Status of Application is required")
                        
                    })}
                    onSubmit={({  name, owner, status }, { setStatus, setSubmitting }) => {
                        setStatus();
                        let s = status?1:0
                        applicationService.addAnApp(name, s, owner, this.state.hname)
                            .then(
                                user => {
                                    // history.push('/admin/hosts');
                                    window.location.reload();
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error.response.data.message);
                                }
                            );
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            {/* <div className="form-group">
                                <label htmlFor="appid">AppId</label>
                                <Field name="appid" type="text" className={'form-control' + (errors.hostname && touched.hostname ? ' is-invalid' : '')} />
                                <ErrorMessage name="appid" component="div" className="invalid-feedback" />
                            </div> */}
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <Field name="name" type="text" className={'form-control' + (errors.ip && touched.ip ? ' is-invalid' : '')} />
                                <ErrorMessage name="name" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="owner">Owner</label>
                                <Field name="owner" type="text" className={'form-control' + (errors.mac && touched.mac ? ' is-invalid' : '')} />
                                <ErrorMessage name="owner" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <Field name="status" type="checkbox" className={'form-control' + (errors.influx && touched.influx ? ' is-invalid' : '')} />
                                <ErrorMessage name="status" component="div" className="invalid-feedback" />
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

export { AddApplicationPage };