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
                controllerList: response.data,
                isLoading: false
                });
        });
    }

    render(){
        if(isLoading){
            return <div>
                <h1>Loading...</h1>
            </div>
        }
        return <div>
            <h1>Controller Page</h1>
            
    }
}