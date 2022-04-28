import React from "react";
import HostService from "../_services/host.service";
import { history } from '../_helpers/history';

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
        // history.push(`/hostAddapps/${host.hostname}/addapps`);
    }

    // function to modify host
    modify(host) {
        history.push(`/hostedit/${host.hostname}`);
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
                Loading...
                <button onClick={() => {
                        history.push('/hostadd');
                        window.location.reload();
                    }}>ADD HOST</button>
                <p></p>
                <button onClick={() => history.back()} className="btn btn-secondary">Back</button>
            </div>;
        }
            return (
                <div>
                    <h1>Hosts</h1>
                    <div>
                        {hosts &&
                            <ul>
                                {hosts.map(host => <div key={host.hostname}>
                                    <li> {host.hostname} - {host.ipaddress} </li>
                                    <button onClick={() => this.addApps(host)}>ADD APPS</button>
                                    <button onClick={() => this.modify(host)}>MODIFY</button>
                                    <button onClick={() => this.delete(host)}>DELETE</button>
                                </div>
                                )}
                            </ul>
                        }
                    </div>
                    <button onClick={() => {
                        history.push('/hostadd');
                        window.location.reload();
                    }}>ADD HOST</button>
                    <p></p>
                <button onClick={() => history.back()} className="btn btn-secondary">Back</button>
                </div>
            );
    }
}

export { HostPage };