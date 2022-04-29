import React from "react";
import HostService from "../_services/host.service";
import { history } from '../_helpers/history';
import { Outlet } from "react-router-dom";

class HostPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hosts: [],
            status: false
        };
    }

    componentDidMount() {
        HostService.getAllHost().then(
            res => {
                this.setState({
                    hosts: res,
                    status: true
                });
            }
        );
    }
    
    // function to add apps to host
    addApps(host) {
        history.push(`/admin/hostaddapps/${host.hostname}`);
        window.location.reload();
    }

    // function to modify host
    modify(host) {
        history.push(`hosts/edit/${host.hostname}`);
        window.location.reload();
    }

    // function to delete host
    delete(host) {
        console.log(host);
        HostService.deleteHost(host.hostname).then(
            res => {
                this.setState({
                    hosts: this.state.hosts.filter(h => h !== host),
                    status: true
                });
            }
        );
    }

    render() {
        const { hosts, status } = this.state;
        if(!status) {
            return <div>
                <div style={{alignItems:'center',textAlign:'center'}} >
                    <button onClick={() => {
                        history.push('/admin/hosts/add');
                        window.location.reload();
                    }}>ADD HOST</button>
                    </div>
                    <p></p>
                    <div style={{alignItems:'center',textAlign:'center'}} >
                <button onClick={() => history.back()} className="btn btn-secondary">Back</button>
                </div>
                            </div>;
        }
            return (
                <div>
                    <div style={{alignItems:'center',textAlign:'center'}} >
                    <h1>Hosts</h1></div>
                    <div>
                        {hosts &&
                            <ul>
                                {hosts.map(host => <div style={{border:'2px solid blue',margin:"25px",padding:"10px 10px",fontSize:"30px"}}  key={host.hostname}>
                                     {host.hostname} - {host.ipaddress}
                                    <br></br>
                                    <button onClick={() => this.addApps(host)}>ADD APPS</button>
                                    &nbsp;
                                    &nbsp;
                                    <button onClick={() => this.modify(host)}>MODIFY</button>
                                    &nbsp;
                                    &nbsp;
                                    <button onClick={() => this.delete(host)}>DELETE</button>
                                </div>
                                )}
                            </ul>
                        }
                    </div>
                    <div style={{alignItems:'center',textAlign:'center'}} >
                    <button onClick={() => {
                        history.push('/admin/hosts/add');
                        window.location.reload();
                    }}>ADD HOST</button>
                    </div>
                    <p></p>
                    <div style={{alignItems:'center',textAlign:'center'}} >
                <button onClick={() => history.back()} className="btn btn-secondary">Back</button>
                </div>
                </div>
            );
    }
}

export { HostPage };