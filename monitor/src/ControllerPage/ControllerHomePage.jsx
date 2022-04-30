import React from "react";
import { Link, Outlet } from "react-router-dom";

class ControllerHomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                 <div style={{ alignItems: 'center', textAlign: 'center' }} >
                     <h1>Controller Home Page</h1></div>
                <div className='navbar' >
                <a  style={{color:'white',float:'left',background:"#9a9dad",width:'18%',marginLeft:'5%',border:'1px solid #bbb',textAlign:'center',alignContent:'center',padding:"20px 20px"}}>
                        <Link to="/graphs" style={{color:'white',padding:"20px 20px"}}>Graphs</Link></a>
                    <a  style={{color:'white',background:"#9a9dad",float:'left',width:'18%',alignItems:'center',border:'1px solid #bbb',textAlign:'center',alignContent:'center',padding:"20px 20px"}}>
                        <Link to="/alerts" style={{color:'white',padding:"20px 20px 20px 20px"}}>Alerts</Link></a>
                    <a style={{color:'white',float:'left',width:'18%',background:"#9a9dad",border:'1px solid #bbb',textAlign:'center',alignContent:'center',padding:"20px 20px"}}>
                        <Link to="/alerts/view" style={{color:'white',padding:"20px 20px"}}>View</Link></a>
                        <a style={{color:'white',float:'left',width:'18%',background:"#9a9dad",border:'1px solid #bbb',textAlign:'center',alignContent:'center',padding:"20px 20px"}}>
                        <Link to="/alerts/add" style={{color:'white',padding:"20px 20px"}}>Add</Link></a>
                </div>
        
            {/* // <div>
            //     <div style={{ alignItems: 'center', textAlign: 'center' }} >
            //         <h1>Controller Home Page</h1></div>
                
            //     <ul>
            //         <li key={"graphs"}>
            //             <Link to="/graphs">Graphs</Link>
            //         </li>
            //         <li key={"alert"}>
            //             <Link to="/alerts">Alerts</Link>
            //         </li>
            //         <li key={"view"}>
            //             <Link to="/alerts/view">View</Link>
            //         </li>
            //         <li key={"add"}>
            //             <Link to="/alerts/add">Add</Link>
            //         </li>
            //     </ul> */}
            <Outlet/>
             </div>
        );
    }
}

export { ControllerHomePage };