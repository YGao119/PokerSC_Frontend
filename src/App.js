import './App.css';
import React from "react";
import { Link } from 'react-router-dom';
import "antd/dist/antd.css";
import { Modal, Button } from "antd";
import { Form, Input } from "antd";
import UserSession from './UserSession';




function requestLogin(username, password){
	const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
    };
    fetch('http://45.79.72.230:8080/login?username=&password=1', requestOptions)
        .then(response => console.log(response))
}

function requestSignUp(username, password){
	const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
    };
    fetch('http://45.79.72.230:8080/signup?username=2&password=1&profile_url=1', requestOptions)
		.then(response => response.text())
		.then(data => console.log(data));
}

function LoginModalButton() {
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
	};
  
	const UserLoginForm = () => {
	  const onFinish = (values) => {
		console.log("Success:", values);
		UserSession.setName(values["username"]);
		var linkToClick = document.getElementById('to_gaming');
		linkToClick.click();
		//window.location.href = 'gaming';
		//window.history.pushState('', 'New Page Title', '/gaming');
	  };
  
	  const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	  };
  
	  return (
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
	  );
	};
  
	return (
	  <>
		<div class="main_button" onClick={()=>{setVisible(true);}}><p style={{color:"white", fontSize:"14px"}} className="pixel_text">Login</p></div>
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
	};
  
	const UserSignupForm = () => {
	  const onFinish = (values) => {
		console.log("Success:", values);
		var linkToClick = document.getElementById('to_gaming');
		linkToClick.click();
	  };
  
	  const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	  };
  
	  return (
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
	  );
	};
  
	return (
	  <>
		<div class="main_button" onClick={()=>{setVisible(true);}}><p style={{color:"white", fontSize:"14px"}} className="pixel_text">SignUp</p></div>
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
		{LoginModalButton()}
		{SignupModalButton()}
		<div class="main_button" onClick={()=>{var linkToClick = document.getElementById('to_guest'); linkToClick.click();}}><p style={{color:"white", fontSize:"14px"}} className="pixel_text">Guest</p></div>
		{/*<button onClick={()=>requestLogin("test1", "test")}>test1</button>
		<button onClick={()=>requestSignUp("test1", "test")}>test2</button>*/}
		
		<Link id="to_gaming" to="/gaming"></Link>
		<Link id="to_guest" to="/guest"></Link>
		</div>
	);
}
export default App;
