import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React from "react";
import { history } from '../_helpers/history';
import metricService from '../_services/metric.service';

class AddAlertPage extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                    <div style={{alignItems:'center',textAlign:'center'}} >

                <h2>Add an Alert</h2></div>
                <Formik
                    initialValues={{
                        metric: '',
                    }}
                    validationSchema={Yup.object().shape({
                        metric: Yup.string()
                            .required('Metric is required')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        metricService.addMetric(values.metric)
                            .then(
                                value => {
                                    history.push('/admin/alerts');
                                    window.location.reload();
                                }
                            ).catch(
                                error => {
                                    console.log(error);
                                    setSubmitting(false);
                                    // alert(error.response.data.message);
                                }
                            )
                    }}>
                        <Form style={{alignItems:"center",textAlign:'center',margin:'5%'}}>
                        <div className="form-group">
                            <label htmlFor="metric">Metric</label>
                            &nbsp;&nbsp;
                            <Field name="metric" type="text" className="form-control" />
                            <ErrorMessage name="metric" component="div" className="alert alert-danger" />
                        </div>
                        <br></br>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </Form>
                </Formik>
                <br></br>

                    <div style={{alignItems:'center',textAlign:'center'}} >
                <button onClick={() => history.back()} className="btn btn-secondary">Back</button>
            </div>
            </div>
        );
    }
}

export {AddAlertPage};