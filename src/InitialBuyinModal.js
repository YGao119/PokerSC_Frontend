import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Modal, Button, Tooltip, Alert } from "antd";
import UserSession from "./UserSession";

import Slider from "@mui/material/Slider";

export default class InitialBuyinModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            value: 200,
            alertVisible: false,
            alertMessage: "",
            alertVisible: false
        };
    }

    requestJoin(position, amount, setAlert) {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'text/plain;charset=UTF-8', 
            }
        };
        var requestUrl = `${process.env.REACT_APP_URL}/games/join?username=${UserSession.getName()}&position=${position}&buyin=${amount}`;

        console.log(requestUrl)
        fetch(requestUrl, requestOptions)
            .then(response => response.text())
            .then(
                data => {
                    console.log(data);
                    if (data === "success") {
                        console.log(requestUrl + " success");
                    }
                    else {
                        this.setAlert("Action Invalid");
                    }
                }
            )
            .catch(err => {
                this.setAlert("Encounter Error");
            })
    }

    handleClose = () => {
        this.setState({
            visible: false,
            alertVisible: false
        })
    }
    setAlert = (message) => {
        this.setState({
            visible: true,
            alertMessage: message
        })
    }
    handleConfirm = () => {
        this.setState({
            visible: false
        })
        this.requestJoin(this.props.position, this.state.value, this.setAlert)
        this.state.visible = false;
    }
    handleSliderChange = (event, newValue) => {
        this.setState({value:newValue})
    }
    setBuyinModal(){
        this.setState({
            visible: true
        })
        console.log(this.props)
    }

    render() {

        return (<Modal key={this.props.position}
            visible={this.state.visible}
            title={<p style={{ color: "black", fontSize: "12px", "marginTop": "-9px" }} className="pixel_text">Choose Buyin Amount</p>}

            onCancel={this.handleClose}
            footer={[
                <Button type="default" onClick={this.handleConfirm} >
                    <p style={{ color: "black", fontSize: "10px", "marginTop": "5px" }} className="pixel_text">Confirm</p>
                </Button>
            ]}
        >
            <Alert style={{ visibility: this.state.alertVisible ? "visible" : "hidden", height: "30px" }} message={<p style={{ color: "black", fontSize: "9px", "marginTop": "16px" }} className="pixel_text">{this.state.alertMessage}</p>} type="error" /><br />
            <Slider
                min={200}
                max={1200}
                style={{ marginTop: "10px" }}
                defaultValue={200}
                valueLabelDisplay="off"
                visible={true}
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

            <p style={{ color: "black", fontSize: "20px", marginTop: "10px" }} className="pixel_text">{this.state.value}</p>

        </Modal>
        );


    }


}

