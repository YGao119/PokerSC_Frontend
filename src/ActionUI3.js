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
            <Tooltip trigger="click" placement="bottom" title={<div style={{textAlign:"center", justifyContent: "center"}}>
                <span className="pixel_text" style={{ color: "lightGray", fontSize: "10px", marginTop:"2px"}}>{"Steven: +500"}</span><br/>
                <span className="pixel_text" style={{ color: "lightGray", fontSize: "10px", marginTop:"2px"}}>{"Jason: +400"}</span><br/>
                <span className="pixel_text" style={{ color: "lightGray", fontSize: "10px", marginTop:"2px"}}>{"Thomas: +210"}</span><br/>
                <span className="pixel_text" style={{ color: "lightGray", fontSize: "10px", marginTop:"2px"}}>{"Peter: +200"}</span><br/>
                <span className="pixel_text" style={{ color: "lightGray", fontSize: "10px", marginTop:"2px"}}>{"Test1: -200"}</span><br/>
                <span className="pixel_text" style={{ color: "lightGray", fontSize: "10px", marginTop:"2px"}}>{"Test2: -200"}</span><br/>
                <span className="pixel_text" style={{ color: "lightGray", fontSize: "10px", marginTop:"2px"}}>{"Test3: -200"}</span><br/>
                </div>}>
                <div className="action_button2" onClick={() => { }}><p style={{ color: "white", fontSize: "8px", marginLeft: "-20px" }} className="pixel_text">Stats</p></div>
            </Tooltip>
            
          
        </div>
      </>
    );
  }
}
