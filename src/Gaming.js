import { Component } from "react";
import "./Gaming.css";
import UserSession from './UserSession';
import { Link } from 'react-router-dom';
import Board from './Board';


export default class Gaming extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isGuest: this.props.guest
		}
	}
	render() {
		if(this.state.isGuest){
			return (
				<div className="gaming_ui">
					<Board></Board>
					<div id="stars"></div>
					<div id="stars2"></div>
					<div id="stars3"></div>
				</div>
			);
		}
		else{
			if(UserSession.getName() === ""){
				window.location.href = "/"
			}
			else{
				return (
					<div className="gaming_ui">
					<h1 className="pixel_text" style={{color:"white"}}>Welcome, {UserSession.getName()}</h1>			
					<div id="stars"></div>
					<div id="stars2"></div>
					<div id="stars3"></div>
					</div>
				)
			}
		}
	}
}