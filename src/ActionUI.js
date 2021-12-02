import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Modal, Button } from "antd";

import Slider from "@mui/material/Slider";

export default class ActionUI extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      canCheck: props.canCheck,
      min: props.min,
      max: props.max,
      value: props.min
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

  handleSliderChange = (event, newValue) => {
    this.setState({value: newValue});
  };

  render() {
    const { visible } = this.state;

    return (
      <>
        <div class="col grid_item_q">
            <div className="action_button" onClick={() => { }}><p style={{ color: "white", fontSize: "8px", marginLeft: "-20px" }} className="pixel_text">Fold</p></div>
            <div className="action_button" onClick={() => { }}><p style={{ color: "white", fontSize: "8px", marginLeft: "-20px" }} className="pixel_text">{this.state.canCheck ? "Check" : "Call"}</p></div>
            <div className="action_button" onClick={this.showModal} ><p style={{ color: "white", fontSize: "8px", marginLeft: "-20px" }} className="pixel_text">Raise</p></div>
          
        </div>
        <Modal
          visible={visible}
          title={<p style={{color:"black", fontSize:"12px",  "marginTop":"-9px"}} className="pixel_text">Choose Amount</p>}
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
            
            <p style={{color: "black", fontSize:"20px", marginTop:"10px"}} className="pixel_text">{this.state.value != this.state.max ? this.state.value : "All In!"}</p>
        </Modal>
      </>
    );
  }
}
