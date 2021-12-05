import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Modal, Button, Tooltip } from "antd";

import Slider from "@mui/material/Slider";

export default class ActionUI2 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    };
  }
  

  render() {
    const { visible } = this.state;

    return (
      <>
        <div class="col grid_item_q">
            <div className="action_button2" onClick={()=>{
              var linkToClick = document.getElementById('to_home');
              linkToClick.click();}
            }><p style={{ color: "white", fontSize: "8px", marginLeft: "-20px" }} className="pixel_text">Leave</p></div>
            <Tooltip key={this.props.profits} trigger="click" placement="bottom" title={<div style={{textAlign:"center", justifyContent: "center"}}>
              {
                  this.props.profits.map(each => <div><span className="pixel_text" style={{ color: "lightGray", fontSize: "10px", marginTop:"2px"}}>{each}</span><br/></div>)
              }
                </div>}>
                <div className="action_button2" onClick={() => { }}><p style={{ color: "white", fontSize: "8px", marginLeft: "-20px" }} className="pixel_text">Stats</p></div>
            </Tooltip>
            
          
        </div>
      </>
    );
  }
}
