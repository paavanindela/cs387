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
                <h2>Add an Alert</h2>
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
                    }}
                >
                    <Form>
                        <div className="form-group">
                            <label htmlFor="metric">Metric</label>
                            <Field name="metric" type="text" className="form-control" />
                            <ErrorMessage name="metric" component="div" className="alert alert-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </Form>
                </Formik>
                <button onClick={() => history.back()} className="btn btn-secondary">Back</button>
            </div>
        );
    }
}

export {AddAlertPage};