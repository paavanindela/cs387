import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UserService from "../_services/user.service";
import HostService from "../_services/host.service";
import { history } from '../_helpers/history';

class ControllerHostPage extends React.Component {
  constructor(props) {
    super(props);
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
  componentDidMount() {
    HostService.getAllHost().then(
      res => {
        this.setState({
          hostList: res
        });
      }
    );
    UserService.getHosts(this.state.username).then(
      res => {
        console.log(res)
        this.setState({
          selectedHostList: res.hlist.map(
            (host) => host.hostname),
        });
      }
    );
  }

  addHostList() {
    // console.log(this.state.selectedHostList, this.state.username);
    UserService.addHosts(this.state.username, this.state.selectedHostList).then(() => {
      history.push('/admin/controllers');
      window.location.reload();
    }).catch(
      err => {
        console.log(err);
      }
    )
  }

  render() {
    const { hostList, username, selectedHostList } = this.state;
    // console.log(hostList, username, selectedHostList);
    let color = "#ffffff"
    return (
      // form component to select start and end times
      <div>
                    <div style={{alignItems:'center',textAlign:'center'}} >
        <h1> CONTROLLER HOST PAGE </h1></div>
        <br></br>
        <div style={{alignItems:'center',textAlign:'center'}} ><h2>Previously Selected</h2></div>
                    <div style={{padding:'10px', alignItems:'center',textAlign:'center',border:"2px solid black",margin:'5px'}} >
        {selectedHostList.map(
          (host, index) => {
            return (
              <div key={index} style={{alignItems:'center',textAlign:'center'}}>
                {host}
                <br></br>
              </div>
            )
          }
        )}
        </div>
        <Formik
          initialValues={{

            selectedHostList: selectedHostList,

          }}
          validationSchema={Yup.object().shape({
            selectedHostList: Yup.array().required('Host is required'),
          })}
          onSubmit={({ selectedHostList }, { setStatus, setSubmitting }) => {
            setStatus();
            this.setState({
              selectedHostList: selectedHostList,
            }, () => {
              this.addHostList();
            });
          }}
          render={({ errors, status, isSubmitting }) => (
            <Form style={{margin:'5%',alignItems:"center",textAlign:'center'}}>
              <div className="form-group">
<br></br>
<br></br>
                <div className='form-group'>
        <div style={{alignItems:'center',textAlign:'center'}} ><label htmlFor="selectedHostList"><h2>Hosts</h2></label></div>

                  
                  <div style={{alignItems:'center',textAlign:'center',border:"2px solid black",margin:'5px'}} >
                  <Field name="selectedHostList" as="select" className={'form-control' + (errors.selectedHostList && touched.selectedHostList ? ' is-invalid' : '')} multiple>
                    {hostList.map((host, index) =>
                      <option key={index} value={host.hostname}>{host.hostname}</option>
                    )}
                  </Field>
                  <ErrorMessage name="selectedHostList" component="div" className="invalid-feedback" />
                </div>
              </div>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary mr-2">SELECT</button>
              </div>
            </Form>
          )}
        />
                <br></br>

                    <div style={{alignItems:'center',textAlign:'center'}} >
        <button type="button" className="btn btn-primary" onClick={() => { history.back() }}>BACK</button>
      </div>
      </div>
    );
  }

}

export { ControllerHostPage }

