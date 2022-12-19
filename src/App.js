import './App.css';
import React from "react";
import { Link } from 'react-router-dom';
import "antd/dist/antd.css";
import { Modal, Button, Alert } from "antd";
import { Form, Input } from "antd";
import UserSession from './UserSession';


function getRandomInt(max) {
	return Math.floor(Math.random() * max);
  }

function requestLogin(username, password, setAlert){
	const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
    };
	const requestUrl = `${process.env.REACT_APP_URL}/login?username=${username}&password=${password}`;
    fetch(requestUrl, requestOptions)
		.then(response => response.text())
		.then(
			data => {
				console.log(data);
				if(data !== "failure" && data.length === 64){
					UserSession.setName(username);
					UserSession.setHash(data);
					var linkToClick = document.getElementById('to_gaming');
					linkToClick.click();
				}
				else{
					setAlert("Login Failed, Check Your Username & Password");
				}
			}
		)
		.catch(err => {
			setAlert("Encounter Error");
		})
}

function requestSignUp(username, password, setAlert){
	const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
    };
	var randInt = getRandomInt(10200)+"";
	while(randInt.length < 4){
		randInt = "0"+randInt;
	}
	var pfpUri = "pfps/"+randInt+".png";
	const requestUrl = `${process.env.REACT_APP_URL}/signup?username=${username}&password=${password}&profile_url=${pfpUri}`;
	console.log(requestUrl);
    fetch(requestUrl, requestOptions)
		.then(response => response.text())
		.then(data => {
			console.log(data);
			if(data !== "failure" && data.length === 64){
				UserSession.setName(username);
				UserSession.setHash(data);
				var linkToClick = document.getElementById('to_gaming');
				linkToClick.click();
			}
			else{
				setAlert("SignUp Failed, The Username Has Been Taken");
			}
		}).catch(err => {
			setAlert("Encounter Error");
	})
}

function LoginModalButton() {
	const [alertVisible, setAlertVisible] = React.useState(false);
	const [alertMessage, setAlertMessage] = React.useState("");
	const handleClose = () => {
		setAlertVisible(false);
	};
	const setAlert = (message) => {
		setAlertMessage(message);
		setAlertVisible(true);
	}

	const [visible, setVisible] = React.useState(false);
	const [confirmLoading, setConfirmLoading] = React.useState(false);
  
  
	const handleOk = () => {
	  setConfirmLoading(true);
	  setTimeout(() => {
		setVisible(false);
		setConfirmLoading(false);
	  }, 2000);
	};
  
	const handleCancel = () => {
	  console.log("Clicked cancel button");
	  setVisible(false);
	  setAlertVisible(false);
	};
  
	const UserLoginForm = () => {
	  const onFinish = (values) => {
		requestLogin(values["username"], values["password"], setAlert);
	  };
  
	  const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	  };
  
	  return (
		<>
		<Alert style={{visibility:alertVisible?"visible":"hidden", height:"30px"}} message={<p style={{color:"black", fontSize:"9px", "marginTop":"16px"}} className="pixel_text">{alertMessage}</p>} type="error" afterClose={handleClose} /><br/>
		<Form
		  name="basic"
		  labelCol={{
			span: 0
		  }}
		  wrapperCol={{
			span: 10
		  }}
		  initialValues={{
			remember: false
		  }}
		  onFinish={onFinish}
		  onFinishFailed={onFinishFailed}
		  autoComplete="off"
		>
		  <Form.Item
			label={<p style={{color:"black", fontSize:"12px", "marginTop":"16px"}} className="pixel_text">Username</p>}
			name="username"
			rules={[
			  {
				required: true,
				message: ""
			  }
			]}
		  >
			<Input />
		  </Form.Item>
  
		  <Form.Item
			label={<p style={{color:"black", fontSize:"12px", "marginTop":"16px"}} className="pixel_text">Password</p>}
			name="password"
			rules={[
			  {
				required: true,
				message: ""
			  }
			]}
		  >
			<Input.Password />
		  </Form.Item>
  
		  <Form.Item
			wrapperCol={{
			  offset: 18,
			  span: 16
			}}
		  >
			<Button type="default" htmlType="submit">
			<p style={{color:"black", fontSize:"10px", "marginTop":"5px"}} className="pixel_text">Submit</p>
			</Button>
		  </Form.Item>
		</Form>
		</>
	  );
	};
  
	return (
	  <>
		<div class="main_button" onClick={()=>{setVisible(true);}}><p style={{color:"white", fontSize:"14px", marginLeft:"-5px"}} className="pixel_text">Login</p></div>
		<Modal
		  title={<p style={{color:"black", fontSize:"12px",  "marginTop":"-9px"}} className="pixel_text">Enter Username and Password</p>}
		  visible={visible}
		  onOk={handleOk}
		  confirmLoading={confirmLoading}
		  onCancel={handleCancel}
		  footer={null}
		>
		  {UserLoginForm()}
		</Modal>
	  </>
	);
};
  
function SignupModalButton() {
	const [alertVisible, setAlertVisible] = React.useState(false);
	const [alertMessage, setAlertMessage] = React.useState("");
	const handleClose = () => {
		setAlertVisible(false);
	};
	const setAlert = (message) => {
		setAlertMessage(message);
		setAlertVisible(true);
	}

	const [visible, setVisible] = React.useState(false);
	const [confirmLoading, setConfirmLoading] = React.useState(false);
  
  
	const handleOk = () => {
	  setConfirmLoading(true);
	  setTimeout(() => {
		setVisible(false);
		setConfirmLoading(false);
	  }, 2000);
	};
  
	const handleCancel = () => {
	  console.log("Clicked cancel button");
	  setVisible(false);
	  setAlertVisible(false);
	};
  
	const UserSignupForm = () => {
	  const onFinish = (values) => {
		requestSignUp(values["username"], values["password"], setAlert);
	  };
  
	  const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	  };
  
	  return (
		<>
		<Alert style={{visibility:alertVisible?"visible":"hidden", height:"30px"}} message={<p style={{color:"black", fontSize:"9px", "marginTop":"16px"}} className="pixel_text">{alertMessage}</p>} type="error" afterClose={handleClose} /><br/>
		<Form
		  name="basic"
		  labelCol={{
			span: 0
		  }}
		  wrapperCol={{
			span: 10
		  }}
		  initialValues={{
			remember: false
		  }}
		  onFinish={onFinish}
		  onFinishFailed={onFinishFailed}
		  autoComplete="off"
		>
		  <Form.Item
			label={<p style={{color:"black", fontSize:"12px", "marginTop":"16px"}} className="pixel_text">Username</p>}
			name="username"
			rules={[
			  {
				required: true,
				message: ""
			  }
			]}
		  >
			<Input />
		  </Form.Item>
  
		  <Form.Item
			label={<p style={{color:"black", fontSize:"12px", "marginTop":"16px"}} className="pixel_text">Password</p>}
			name="password"
			rules={[
			  {
				required: true,
				message: ""
			  }
			]}
		  >
			<Input.Password />
		  </Form.Item>
  
		  <Form.Item
			wrapperCol={{
			  offset: 18,
			  span: 16
			}}
		  >
			<Button type="default" htmlType="submit">
			<p style={{color:"black", fontSize:"10px", "marginTop":"5px"}} className="pixel_text">Submit</p>
			</Button>
		  </Form.Item>
		</Form>
		</>
	  );
	};
  
	return (
	  <>
		<div class="main_button" onClick={()=>{setVisible(true);}}><p style={{color:"white", fontSize:"14px", marginLeft:"-8px"}} className="pixel_text">SignUp</p></div>
		<Modal
		  title={<p style={{color:"black", fontSize:"12px",  "marginTop":"-9px"}} className="pixel_text">Enter Username and Password</p>}
		  visible={visible}
		  onOk={handleOk}
		  confirmLoading={confirmLoading}
		  onCancel={handleCancel}
		  footer={null}
		>
		  {UserSignupForm()}
		</Modal>
	  </>
	);
};


function App() {
	document.title = "PokerSC";
	
	return (
		<div className="main_home clearfix">
		
		<p className="pixel_text" style={{ textAlign: "center", marginTop: "25vh", fontSize: "100px"}}>
			<span style={{color:"white"}}>Poker</span>
			<span style={{color:"#990000"}}>S</span>
			<span style={{color:"#FFCC00"}}>C</span>
		</p>
		<div id="stars"></div>
		<div id="stars2"></div>
		<div id="stars3"></div>
		<img className="main_img_left" style={{float:"left", marginLeft:"10vw", marginTop:"-10vh", pointerEvents:"none"}} src="h_A.gif" height="250px" alt=""></img>
		<img className="main_img_right" style={{float:"right", marginRight:"10vw", marginTop:"-10vh", pointerEvents:"none"}} src="d_A.gif" height="250px" alt=""></img>
		
		<br/>
		<div style={{justifyContent: "center", display: "flex", alignItems: "center"}}>
		{LoginModalButton()}
		{SignupModalButton()}
		<div class="main_button" onClick={()=>{var linkToClick = document.getElementById('to_guest'); linkToClick.click();}}><p style={{color:"white", fontSize:"14px", marginLeft:"-5px"}} className="pixel_text">Guest</p></div>
		</div>
		<br/><br/>
		
		<Link id="to_gaming" to="/gaming"></Link>
		<Link id="to_guest" to="/guest"></Link>
		</div>
	);
}
export default App;
