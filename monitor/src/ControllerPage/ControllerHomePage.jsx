import React from "react";
import { Link } from "react-router-dom";

class ControllerHomePage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h1>Controller Home Page</h1>
                <ul>
                    <li key={"graphs"}>
                        <Link to="/graphs">Graphs</Link>
                    </li>
                    <li key={"alert"}>
                        <Link to="/alerts">Alerts</Link>
                    </li>
                    <li key={"add"}>
                        <Link to="/alerts/add">Add</Link>
                    </li>
                    <li key={"modify"}>
                        <Link to="/alerts/modify">Modify</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export {ControllerHomePage};