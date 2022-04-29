import React from "react";
import UserService from "../_services/user.service";
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
                                        UserService.makeActive(controller.username);
                                        window.location.reload();
                                    }
                                }>Make Active</button>}
                {controller.status == 1 && <button className="form-control" onClick={
                                    () => {
                                        UserService.revokeAccess(controller.username)
                                        window.location.reload();
                                    }  
                                }>Make Inactive</button>}
                <button onClick={
                                    () => {
                                        let res = UserService.deleteController(controller.username); 
                                        window.location.reload();
                                    }
                                }>Delete User</button>
                </div>)}
            </ul>
        </div>;            
    }
}

export {ControllerPage};