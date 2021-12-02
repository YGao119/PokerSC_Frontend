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
      visible: false,
      visible2: false, // for leave
      canCheck: props.canCheck,
      min: props.min,
      max: props.max,
      value: props.min,
      currentProfit: 500
    };
  }
  

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleConfirm = () => {
    setTimeout(() => {
      this.setState({ visible: false });
    }, 1000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  showModal2 = () => {
    this.setState({
      visible2: true
    });
  };

  handleConfirm2 = () => {
    setTimeout(() => {
      this.setState({ visible2: false });
    }, 1000);
  };

  handleCancel2 = () => {
    this.setState({ visible2: false });
  };

  handleSliderChange = (event, newValue) => {
    this.setState({value: newValue});
  };

  render() {
    const { visible } = this.state;

    return (
      <>
        <div class="col grid_item_q">
            <div className="action_button2" onClick={this.showModal2}><p style={{ color: "white", fontSize: "8px", marginLeft: "-20px" }} className="pixel_text">Leave</p></div>
            <div className="action_button2" onClick={this.showModal} ><p style={{ color: "white", fontSize: "8px", marginLeft: "-20px" }} className="pixel_text">Buyin</p></div>
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
        <Modal
          visible={visible}
          title={<p style={{color:"black", fontSize:"12px",  "marginTop":"-9px"}} className="pixel_text">Choose Buyin Amount</p>}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button type="default" onClick={this.handleConfirm} >
              <p style={{color:"black", fontSize:"10px", "marginTop":"5px"}} className="pixel_text">Confirm</p>
            </Button>
          ]}
        >
          <Slider
                min={this.state.min}
                max={this.state.max}
                style={{ marginTop: "10px" }}
                defaultValue={this.state.min}
                valueLabelDisplay="off"
                visible={false}
                onChange={this.handleSliderChange}
                sx={{
                    width: 400,
                    color: "black",
                    "& .MuiSlider-thumb": {
                        borderRadius: "0px"
                    },
                    "& .MuiSlider-rail": {
                        borderRadius: "0px"
                    },
                    "& .MuiSlider-track": {
                        borderRadius: "0px"
                    }
                }}
            ></Slider>
            
            <p style={{color: "black", fontSize:"20px", marginTop:"10px"}} className="pixel_text">{this.state.value}</p>
        </Modal>

        <Modal
          visible={this.state.visible2}
          title={<p style={{color:"black", fontSize:"12px",  "marginTop":"-9px"}} className="pixel_text">Are You Sure You Want to Leave?</p>}
          onOk={this.handleOk2}
          onCancel={this.handleCancel2}
          footer={[
            <Button type="default" onClick={this.handleConfirm2} >
              <p style={{color:"black", fontSize:"10px", "marginTop":"5px"}} className="pixel_text">Confirm</p>
            </Button>
          ]}
        >
          <p style={{color: "black", fontSize:"14px", marginTop:"10px"}} className="pixel_text">{"Your Current Profit:"}
            {this.state.currentProfit > 0 ? 
              <span  style={{color: "green"}}>{"+"+this.state.currentProfit}</span>:
              <span  style={{color: "red"}}>{this.state.currentProfit}</span>
            }
          
          </p>
        </Modal>
      </>
    );
  }
}
