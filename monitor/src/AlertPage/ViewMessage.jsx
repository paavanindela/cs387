import React from "react";
import { Link } from "react-router-dom";
import thresholdService from "../_services/threshold.service";

class ViewMessages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            status: false
        }
    }

    componentDidMount() {
        thresholdService.getAllMessages().then(messages => this.setState({ 
            messages: messages,
            status: true })).catch(
            error => {
                this.setState({
                    status: false
                });
            }
        );
    }

    render() {
        const { status, messages } = this.state;
        // console.log(messages);
        if(!status && messages) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <h1>View Messages</h1>
                <ul>
                    {messages.map(message =>
                        <li key={message.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{message.id}</h5>
                                    <p className="card-text">{message.text}</p>
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export { ViewMessages };