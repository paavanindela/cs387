import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UserService from "../_services/user.service";
import HostService from "../_services/host.service";
import { history } from '../_helpers/history';

class ControllerHostPage extends React.Component {
    constructor (props) {
        super (props);
        const pathname = window.location.pathname //returns the current url minus the domain name
        // parse url to get userID
        const userID = pathname.split('/')[3];
        // console.log(userID);
        this.state = {
            hostList: [],
            username: userID,
            selectedHostList: []
        }
    }
    componentDidMount () {
        HostService.getAllHost().then(
            res => {
                this.setState({
                    hostList: res
                });
            }
        );
        UserService.getHosts(this.state.username).then(
            res => {
                this.setState({
                    selectedHostList: res.hlist,
                });
            }
        );
    }

    addHostList () {
      console.log(this.state.selectedHostList, this.state.username);
        UserService.addHosts(this.state.username, this.state.selectedHostList).then(()=>{
          history.push('/admin/controllers');
          window.location.reload();
        }).catch(
          err => {
            console.log(err);
          }
        )
    }

    render() {
        const { hostList, username, selectedHostList} = this.state;
        let color = "#ffffff"
        return (
          // form component to select start and end times
          <div>
            <h1> GRAPHS </h1>
            <Formik
              initialValues={{
                
                selectedHostList: selectedHostList,
                
              }}
              validationSchema={Yup.object().shape({
                selectedHostList: Yup.array().required('Host is required'),
              })}
              onSubmit={({selectedHostList }, { setStatus, setSubmitting }) => {
                setStatus();
                this.setState({
                  selectedHostList: selectedHostList,
                }, () => {
                  this.addHostList();
                });
              }}
              render={({ errors, status, isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    
                    <div className='form-group'>
                      <label htmlFor="selectedHostList">Hosts</label>
                      <Field name="selectedHostList" as="select" className={'form-control' + (errors.selectedHostList && touched.selectedHostList ? ' is-invalid' : '')} multiple>
                        {hostList.map((host, index) =>
                          <option key={index} value={host.hostname}>{host.hostname}</option>
                        )}
                      </Field>
                      <ErrorMessage name="selectedHostList" component="div" className="invalid-feedback" />
                    </div>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary mr-2">SELECT</button>
                  </div>
                </Form>
              )}
            />
   
          </div>
        );
      }
    
}

export { ControllerHostPage }

