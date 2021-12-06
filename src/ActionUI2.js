import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Modal, Button, Tooltip, Alert } from "antd";

import { Link } from 'react-router-dom';

import Slider from "@mui/material/Slider";
import UserSession from './UserSession';

export default class ActionUI2 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      visible2: false, // for leave
      canCheck: props.canCheck,
      value: props.min,
      alertVisible: false,
      alertMessage: ""
    };
  }
  

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleConfirm = () => {
    this.requestAction('buyin', this.state.value, this.setAlert);
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
    console.log("leaveeeee"+this.props.canLeave)
    if(!this.props.canLeave){
      this.setAlert("You Can Leave After The Hand Ends");
      return;
    }
    this.requestAction('leave', 0, this.setAlert);
  };

  handleCancel2 = () => {
    this.setState({ visible2: false });
  };

  handleSliderChange = (event, newValue) => {
    this.setState({value: newValue});
  };


  requestAction(action, amount, setAlert){ // leave or buyin
    const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
      };
    var requestUrl = `http://45.79.72.230:8080/games/${action}?username=${UserSession.getName()}`;
    if(action === 'buyin'){
      requestUrl += `&amount=${amount}`;
    }
    console.log(requestUrl)
    fetch(requestUrl, requestOptions)
    .then(response => response.text())
    .then(
      data => {
        console.log(data);
        if(action === "leave"){
          var linkToClick = document.getElementById('to_home');
          linkToClick.click();
        }
        else if(data === "chips exceeded"){
          setAlert("Remaining Chips Cannot Exceed 1200")
        }
        else if(data === "success"){
          this.handleCancel()
        }
        else if(data === "player is active"){
          setAlert("You Cannot Rebuy While Playing The Hand");
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

  setAlert = (message) => {
    this.setState({alertMessage:message, alertVisible:"true"});
    setTimeout(() => {
      this.setState({alertVisible:false})
    }, 3500);
  }

  render() {
    const { visible, profits } = this.state;
    
    return (
      <>
        <div class="col grid_item_q">
            <div className="action_button2" onClick={this.showModal2}><p style={{ color: "white", fontSize: "8px", marginLeft: "-20px" }} className="pixel_text">Leave</p></div>
            <div className="action_button2" onClick={this.showModal} ><p style={{ color: "white", fontSize: "8px", marginLeft: "-20px" }} className="pixel_text">Buyin</p></div>
            <Tooltip key={this.props.profits} trigger="click" placement="bottom" title={<div style={{textAlign:"center", justifyContent: "center"}}>
              {
                  this.props.profits.map(each => <div><span className="pixel_text" style={{ color: "lightGray", fontSize: "10px", marginTop:"2px"}}>{each}</span><br/></div>)
              }
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
          <div 
              key={this.props.min}
          >
          <Alert style={{visibility:this.state.alertVisible?"visible":"hidden", height:"30px"}} message={<p style={{color:"black", fontSize:"9px", "marginTop":"16px"}} className="pixel_text">{this.state.alertMessage}</p>} type="error"/><br/>
          <Slider
                min={this.props.min}
                max={this.props.max}
                style={{ marginTop: "10px" }}
                defaultValue={this.props.min}
                valueLabelDisplay="off"
                visible={false}
                onChange={this.handleSliderChange}
                step={100}
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
            </div>
        </Modal>

        <Modal
          key={this.props.canLeave}
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
          <Alert style={{visibility:this.state.alertVisible?"visible":"hidden", height:"30px"}} message={<p style={{color:"black", fontSize:"9px", "marginTop":"16px"}} className="pixel_text">{this.state.alertMessage}</p>} type="error" /><br/>
          <p key={this.props.selfProfit} style={{color: "black", fontSize:"14px", marginTop:"10px"}} className="pixel_text">{"Your Current Profit:"}
            {this.props.selfProfit > 0 ? 
              <span  style={{color: "green"}}>{"+"+this.props.selfProfit}</span>:
              <span  style={{color: "red"}}>{this.props.selfProfit}</span>
            }
          
          </p>
        </Modal>
      </>
    );
  }
}
