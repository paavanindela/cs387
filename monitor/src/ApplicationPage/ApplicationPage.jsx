import React from "react";
import { history } from "../_helpers/history";
import applicationService from "../_services/application.service";

class ApplicationPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            applications: [],
            loading: true,
            error: null
        };
    }

    componentDidMount(){
        this.loadApplications();
    }

    loadApplications(){
        applicationService.getAllApps()
        .then(applications => {
            this.setState({
                applications: applications,
                loading: false
            });
        })
        .catch(error => {
            this.setState({
                error: error,
                loading: false
            });
        });
    }

    deleteApplication(id){
        this.setState({
            loading: true
        });
        applicationService.deleteAnApp(id)
        .then(() => {
            this.loadApplications();
        })
        .catch(error => {
            this.setState({
                error: error,
                loading: false
            });
        });
    }

    render(){
        const { applications, loading, error } = this.state;
        return (
            <div>
                <h1>Applications</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                {loading && <div className="alert alert-info">Loading...</div>}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Owner</th>
                            <th>Hostname</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map(application => (
                            <tr key={application.appId}>
                                <td>{application.name}</td>
                                <td>{application.status}</td>
                                <td>{application.owner}</td>
                                <td>{application.hname}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => this.deleteApplication(application.appId)}>Delete</button>
                                    {/* <button className="btn btn-primary" onClick={() => history.push(`/applications/${application.appId}`)}>Edit</button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export {ApplicationPage};