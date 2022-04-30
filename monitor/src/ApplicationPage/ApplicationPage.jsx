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
            console.log(applications.data);
            this.setState({
                applications: applications.data,
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
                    <div style={{alignItems:'center',textAlign:'center'}} >
                <h1>Applications</h1></div>
                {error && <div className="alert alert-danger">{error.message}</div>}
                {loading && <div className="alert alert-info">Loading...</div>}
                <table className="table table-striped" style={{width:'100%',border:"1px solid black"}}>
                    <thead style={{border:"1px solid black"}}>
                        <tr style={{border:"1px solid black"}}>
                            <th style={{border:"1px solid black"}} >Name</th>
                            <th style={{border:"1px solid black"}}>Status</th>
                            <th style={{border:"1px solid black"}}>Owner</th>
                            <th style={{border:"1px solid black"}}>Hostname</th>
                            <th style={{border:"1px solid black"}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        {applications.map(application => (
                            <tr key={application.appid} style={{border:"1px solid black",borderRadius:'5px'}}>
                                <td style={{border:"1px solid black",borderRadius:'5px',textAlign:'center'}}>{application.name}</td>
                                <td style={{border:"1px solid black",borderRadius:'5px',textAlign:'center'}}>{application.status}</td>
                                <td style={{border:"1px solid black",borderRadius:'5px',textAlign:'center'}}>{application.owner}</td>
                                <td style={{border:"1px solid black",borderRadius:'5px',textAlign:'center'}}>{application.hostname}</td>
                                <td style={{border:"1px solid black",borderRadius:'5px',textAlign:'center'}}>
                                    <button className="btn btn-danger" onClick={() => this.deleteApplication(application.appid)}>Delete</button>
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