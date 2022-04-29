import React from "react";
import UserService from "../_services/user.service";
import { Link } from 'react-router-dom';

class ControllerPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            controllerList: [],
            isLoading: true
        };
    }
    componentDidMount(){
        UserService.getAll().then(response => {
            this.setState({
                controllerList: response.data.user.rows,
                isLoading: false
                });
        });
    }

    render(){
        const { controllerList, isLoading } = this.state;
        console.log(controllerList)
        if(isLoading){
            return <div>
                Loading...
            </div>
        }
        return <div>
            <h1>Controller Page</h1>
            <ul>
                {controllerList.map(controller => <div key={controller.username}><li>{controller.username}</li>
                {controller.status == 0 && <button className='form-control' onClick={
                                    () => {
                                        UserService.makeActive(controller.username).then(()=>{window.location.reload();});
                                        // window.location.reload();
                                    }
                                }>Make Active</button>}
                {controller.status == 1 && <button className="form-control" onClick={
                                    () => {
                                        UserService.revokeAccess(controller.username).then(()=>{window.location.reload();});
                                    }  
                                }>Make Inactive</button>}
                <button onClick={
                                    () => {
                                        let res = UserService.deleteController(controller.username).then(()=>{window.location.reload();}); 
                                    
                                    }
                                }>Delete User</button>
                {controller.status == 1 && <Link to={`/admin/controllers/${controller.username}`}>Add Hosts For This Controller</Link>}
                </div>)}
            </ul>
        </div>;            
    }
}

export {ControllerPage};