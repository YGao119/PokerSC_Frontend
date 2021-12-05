import { Component } from "react";
import "./Gaming.css";
import UserSession from './UserSession';
import Board from './Board';
import SpectateBoard from "./SpectateBoard";


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
				window.location.href = "/";
			}
			else{
				return (
					<div className="gaming_ui">
					<Board></Board>
					<div id="stars"></div>
					<div id="stars2"></div>
					<div id="stars3"></div>
					</div>
				)
			}
		}
	}
}