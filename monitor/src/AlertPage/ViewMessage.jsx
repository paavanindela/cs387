import React from "react";
import { Link } from "react-router-dom";
import thresholdService from "../_services/threshold.service";

class ViewMessages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        }
    }

    componentDidMount() {
        thresholdService.getAllMessages().then(messages => this.setState({ messages }));
    }

    render() {
        const { messages } = this.state;
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