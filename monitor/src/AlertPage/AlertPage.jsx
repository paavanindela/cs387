import React from "react";
import { history } from '../_helpers/history';
import metricService from "../_services/metric.service";

class AlertPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alertList: [],
            isLoading: true
        };
    }

    componentDidMount() {
        metricService.getAlerts().then(data => {
            this.setState(
                { alertList : data.data
                , isLoading: false });
        });
    }

    delete(alert) {
        metricService.deleteMetric(alert.name).then((data) => {
            // console.log(data);
            window.location.reload();
        });
    }

    render() {
        const { alertList, isLoading } = this.state;
        return (
            <div className="container">
                <h1>Alerts</h1>
                {isLoading && <p>Loading...</p>}
                {!isLoading && alertList.length === 0 && <p>No alerts</p>}
                {!isLoading && alertList.length > 0 && (
                    alertList.map(alert => (
                        <div key={alert.name}>
                            <li> {alert.name} </li>
                            <button onClick={() => this.delete(alert)}>DELETE</button>
                        </div>))
                )}
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        history.push("alerts/add");
                        window.location.reload();
                    }}
                >
                    Add Alert
                </button>
                <button onClick={() => history.back()} className="btn btn-secondary">Back</button>
            </div>
        );
    }
}

export { AlertPage };