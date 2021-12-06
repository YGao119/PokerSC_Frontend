import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Modal, Button } from "antd";

import Slider from "@mui/material/Slider";
import TextField from '@mui/material/TextField';
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
    if(this.props.max < this.props.min){
      this.handleCancel();
    }
    else{
      this.requestAction("raise", this.state.value, this.props.setAlert)
    }
  };

  handleCancel = () => {
    this.setState({ visible: false, value: this.props.min });
  };

  handleSliderChange = (event, newValue) => {
    this.setState({value: newValue});
  };

  handleInputChange = (event) => {
    this.setState({value: event.target.value});
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


  valuetext(value) {
    return <p style={{color:"black"}}>value</p>;
  }
  
  render() {
    const { visible } = this.state;
    if(this.state.value === 0){
      this.state.value = this.props.min;
    }

    const marks = this.props.pot > 20 && this.props.pot > this.props.min && this.props.max > this.props.min && this.props.pot > this.props.max / 20 ? [
      this.props.max > this.props.pot/3 && this.props.min < this.props.pot/3?{
        value: Math.floor(this.props.pot/3),
        label: '⅓',
      }:{},
      this.props.max > this.props.pot/2 && this.props.min < this.props.pot/2?{
        value: Math.floor(this.props.pot/2),
        label: '½',
      }:{},
      this.props.max > this.props.pot && this.props.min < this.props.pot?{
        value: this.props.pot,
        label: '1x',
      }:{},
      this.props.max > this.props.pot*2 && this.props.min < this.props.pot*2?{
        value: this.props.pot * 2,
        label: '2x',
      }:{},
    ]:null;
    return (
      <>
        <div class="col grid_item_q" style={{display:"flex", justifyContent:"center"}}>
            {
            !this.props.canCheck ?
            <div className="action_button" onClick={() => {this.requestAction("fold", 0, this.props.setAlert)}}><p style={{ color: "white", fontSize: "8px", marginLeft: "-20px" }} className="pixel_text">Fold</p></div>:
            null
            } 
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
          {
            this.props.min <= this.props.max ? 
            <div key={this.props.pot}>
            <div key={this.props.max}>
          <Slider
                key={this.props.min}
                min={this.props.min}
                max={this.props.max}
                style={{ marginTop: "10px" }}
                defaultValue={this.props.min}
                value={this.state.value}
                valueLabelDisplay="off"
                visible={false}
                onChange={this.handleSliderChange}
                marks={marks}
                aria-labelledby="non-linear-slider"
                getAriaValueText={this.valuetext}
                sx={{
                    width: 300,
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
            ></Slider><TextField
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            id="standard-size-small"
            variant="standard"
            type="number"
            size="small"
            value={this.state.value}
            style={{width:"100px", marginLeft:"10px"}}
            onChange={this.handleInputChange}
          />
            
            <p style={{color: "black", fontSize:"20px", marginTop:"10px"}} className="pixel_text">{this.state.value !== this.props.max ? this.state.value : "All In!"}</p>
            
            </div>
            </div>
            :
            <p style={{color: "black", fontSize:"15px", marginTop:"10px"}} className="pixel_text">{"Not Enough Chips To Raise"}</p>
          }
        </Modal>
      </>
    );
  }
}
