import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Modal, Button } from "antd";

import Slider from "@mui/material/Slider";
import UserSession from './UserSession';

export default class ActionUI extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false
    };
  }

  componentDidMount(){
    this.setState({value:this.props.min})
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleConfirm = () => {
    this.requestAction("raise", this.state.value, this.props.setAlert)
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleSliderChange = (event, newValue) => {
    this.setState({value: newValue});
  };

  requestAction(action, amount, setAlert){
    const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
      };
    var requestUrl = `http://45.79.72.230:8080/games/${action}?username=${UserSession.getName()}`;
    if(action === 'raise'){
      requestUrl += `&amount=${amount}`;
    }
    console.log(requestUrl)
    fetch(requestUrl, requestOptions)
    .then(response => response.text())
    .then(
      data => {
        console.log(data);
        if(data !== "failure"){
          console.log(requestUrl+" success");
        }
        else{
          setAlert("Action Invalid");
        }
      }
    )
    .catch(err => {
      setAlert("Encounter Error");
    })
  }

  render() {
    const { visible } = this.state;
    if(this.state.value === 0){
      this.state.value = this.props.min;
    }
    return (
      <>
        <div class="col grid_item_q">
            <div className="action_button" onClick={() => {this.requestAction("fold", 0, this.props.setAlert)}}><p style={{ color: "white", fontSize: "8px", marginLeft: "-20px" }} className="pixel_text">Fold</p></div>
            {
              this.props.canCheck ?
              <div key={this.props.canCheck} className="action_button" onClick={() => {this.requestAction("check", 0, this.props.setAlert)}}><p style={{ color: "white", fontSize: "8px", marginLeft: "-20px" }} className="pixel_text">{"Check"}</p></div>:
              <div key={this.props.canCheck} className="action_button" onClick={() => {this.requestAction("call", 0, this.props.setAlert)}}><p style={{ color: "white", fontSize: "8px", marginLeft: "-20px" }} className="pixel_text">{"Call"}</p></div>
            }
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
          <div key={this.props.max}>
          <Slider
                key={this.props.min}
                min={this.props.min}
                max={this.props.max}
                style={{ marginTop: "10px" }}
                defaultValue={this.props.min}
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
            
            <p style={{color: "black", fontSize:"20px", marginTop:"10px"}} className="pixel_text">{this.state.value !== this.props.max ? this.state.value : "All In!"}</p>
            
            </div>
        </Modal>
      </>
    );
  }
}
