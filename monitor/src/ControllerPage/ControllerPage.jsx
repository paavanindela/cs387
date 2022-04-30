import React from "react";
import UserService from "../_services/user.service";
import { Link } from 'react-router-dom';
import { history } from "../_helpers/history";

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
        // console.log(controllerList)
        if(isLoading){
            return <div>
                Loading...
            </div>
        }
        return <div>
            
                    <div style={{alignItems:'center',textAlign:'center'}} >
            <h1>Controller Page</h1></div>
            {/* <ul> */}
                {controllerList.map(controller => <div style={{border:'2px solid blue',margin:"45px",padding:"10px 10px",fontSize:"30px"}} key={controller.username}>{controller.username}
                                <br></br>
                {controller.status == 0 && <button  onClick={
                                    () => {
                                        UserService.makeActive(controller.username).then(()=>{window.location.reload();});
                                        // window.location.reload();
                                    }
                                }>Make Active</button>}
                {controller.status == 1 && <button  onClick={
                                    () => {
                                        UserService.revokeAccess(controller.username).then(()=>{window.location.reload();});
                                    }  
                                }>Make Inactive</button>}
                <button className="form-control" onClick={
                                    () => {
                                        let res = UserService.deleteController(controller.username).then(()=>{window.location.reload();}); 
                                    
                                    }
                                }>Delete User</button>&nbsp;&nbsp;&nbsp;&nbsp;
                {controller.status == 1 && 
                <button className="form-control" onClick={
                                    () => {
                                        history.push(`/admin/controllers/${controller.username}`)
                                        window.location.reload();
                                    }
                                }>Add Hosts</button>}
                </div>)}
            {/* </ul> */}
        </div>;            
    }
}

export {ControllerPage};