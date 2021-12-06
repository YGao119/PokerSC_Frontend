import React, { Component } from "react";
import UserSession from './UserSession';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import './Board.css';
import Slider from "@mui/material/Slider";
import Fade from '@mui/material/Fade';


import { Modal, Button, Tooltip, Alert } from "antd";
import Slide from '@mui/material/Slide';
import ActionUI from './ActionUI'
import ActionUI2 from './ActionUI2'
import ActionUI3 from './ActionUI3'
import InitialBuyinModal from './InitialBuyinModal'

export default class SpectateBoard extends Component {
    constructor(props) {
        super(props);
        //const state_json = props.state_json
        this.buyinModal0 = React.createRef();
        this.buyinModal1 = React.createRef();
        this.buyinModal2 = React.createRef();
        this.buyinModal3 = React.createRef();
        this.buyinModal4 = React.createRef();
        this.buyinModal5 = React.createRef();
        this.buyinModal6 = React.createRef();
        this.buyinModal7 = React.createRef();
        var state_json = `
        {
            "users": [null,null,null,null,null,null,null,null],
            "playersProfits": [""],
            "gameOn": true,
            "remainingChips": [0, 0, 0, 0, 0, 0, 0, 0],
            "communityCards": "",
            "pot": 0,
            "selfHand": [""],
            "selfPosition":5,
            "minimumRaiseAmount":"",
            "actionPosition":"",
            "dealerPosition":0,
            "state":"",
            "numActionLeft":"",
            "selfProfit": 0
        }
        `

        const parsed_state = JSON.parse(state_json);

        this.state = {
            parsed_state: parsed_state,
            users: [],
            profits: [],
            communityCards: [],
            pot: 0,
            selfHand: ["", ""],
            selfPosition: 5,
            minimumRaiseAmount: 0,
            actionPosition: 0,
            state: 0, // num of cards shown
            canCheck: false,
            remainingChips: [0,0,0,0,0,0,0,0],
            alertVisible: false,
            alertMessage: "",
            gameOn: false,
            users_ui: [
                this.playerUI("", "", 0, "", "", "", false, false, true, false, 0, false, false, 0, 0, 0, -1),
                this.playerUI("", "", 0, "", "", "", false, false, true, false, 0, false, false, 0, 0, 1, -1),
                this.playerUI("", "", 0, "", "", "", false, false, true, false, 0, false, false, 0, 0, 2, -1),
                this.playerUI("", "", 0, "", "", "", false, false, true, false, 0, false, false, 0, 0, 3, -1),
                this.playerUI("", "", 0, "", "", "", false, false, true, false, 0, false, false, 0, 0, 4, -1),
                this.playerUI("", "", 0, "", "", "", false, false, true, false, 0, false, false, 0, 0, 5, -1),
                this.playerUI("", "", 0, "", "", "", false, false, true, false, 0, false, false, 0, 0, 6, -1),
                this.playerUI("", "", 0, "", "", "", false, false, true, false, 0, false, false, 0, 0, 7, -1),
            ],
            time:0,
            buyinPos: -1,

        };
    }


    setBuyinModal(position){
        console.log(position);
        if(position === 0){
            this.buyinModal0.current.setBuyinModal();
        }
        if(position === 1){
            this.buyinModal1.current.setBuyinModal();
        }
        if(position === 2){
            this.buyinModal2.current.setBuyinModal();
        }
        if(position === 3){
            this.buyinModal3.current.setBuyinModal();
        }
        if(position === 4){
            this.buyinModal4.current.setBuyinModal();
        }
        if(position === 5){
            this.buyinModal5.current.setBuyinModal();
        }
        if(position === 6){
            this.buyinModal6.current.setBuyinModal();
        }
        if(position === 7){
            this.buyinModal7.current.setBuyinModal();
        }
    }

    getUserUI(user, gameOn, position){
        console.log(user);
        console.log(position);
        if(user == null){
            return this.playerUI("", "", 0, "", "", "", false, false, true, false, 0, false, false, 0, 0, false, position, -1);
        }
        else{
            return this.playerUI(
                user["profileUrl"], 
                user["username"], 
                user["remainingChips"], 
                user["currentAction"], 
                user["hand"][0], 
                user["hand"][1], 
                user["isActive"],  // todo
                user["isSelf"], 
                false, // isEmpty
                user["isFold"], 
                user["currentBet"], 
                user["isDealer"], 
                gameOn, 
                user["totalProfit"], 
                user["winRate"],
                user["isWinner"],
                position,
                user["emoji"]
            );
        }
    }

    loadData() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
        };
        var requestUrl = `http://45.79.72.230:8080/games?username=SpectatorAccount&passwordHash=e84f9c4cfdb9a3d26424b9f334f4ccbd26ce34a9aa135a30681126942917c589`;
        
        console.log(requestUrl)
        fetch(requestUrl, requestOptions)
        .then(response => response.text())
        .then(
            data => {
            //console.log(data);
            if(data !== "no user found"){
                console.log(requestUrl+" success");
                console.log(data);
                const parsed_state = JSON.parse(data);
                console.log(parsed_state);
                this.setParsedStateToState(parsed_state);
                console.log("updated2");
            }
            else{
                //alert("no user found");
            }
            }
        )
        .catch(err => {
            //console.log("Encounter Error");
        })
     }

    shiftArrayToRight(arr, places) {
        for (var i = 0; i < places; i++) {
            arr.unshift(arr.pop());
        }
    }

    setParsedStateToState(parsed_state){
        var users_ui = []
        var position = 0;
        for(position = 0; position < 8; position++){
            users_ui.push(this.getUserUI(parsed_state["users"][position], parsed_state["gameOn"], position));
        }
        // make self to be on 5
        const selfPosition = parsed_state["selfPosition"];
        var shiftLength = 5 - selfPosition;
        if(shiftLength < 0){
            shiftLength += 8;
        }
        this.shiftArrayToRight(users_ui, shiftLength);
        this.setState({
            chasingTime: this.state.time,
            users: parsed_state["users"],
            communityCards: parsed_state["communityCards"],
            profits: parsed_state["playersProfits"],
            pot: parsed_state["pot"],
            selfHand: parsed_state["selfHand"],
            selfPosition: parsed_state["selfPosition"],
            minimumRaiseAmount: parsed_state["minimumRaiseAmount"],
            actionPosition: parsed_state["actionPosition"],
            dealerPosition: parsed_state["dealerPosition"],
            state: parsed_state["state"],
            numActionLeft: parsed_state["numActionLeft"],
            remainingChips: parsed_state["remainingChips"],
            canCheck: parsed_state["canCheck"],
            selfProfit: parsed_state["selfProfit"],
            gameOn: parsed_state["gameOn"],
            users_ui: users_ui,
        })
        console.log(parsed_state);
        console.log("updated");
    }

    componentDidMount(){
        this.setParsedStateToState(this.state.parsed_state);
        //console.log(this.state);
        this.loadData();
        this.interval = setInterval(() => this.setState({time:this.state.time+1}), 1000);
        
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    playerUI(uri, username, remainingChips, action, handA, handB, isActive, isSelf, isEmpty, isFold, currentHandAmount, isDealer, gameOn, totalProfit, winRate, isWinner, thisPos, emoji) {
        var userboxUri = "userbox.png";
        if (!handA) handA = "cardback";
        if (!handB) handB = "cardback";
        var cardA = cardMapping(handA);
        var cardB = cardMapping(handB);
        if(isWinner){
            action = "winner";
        }
        if(action === "null"){
            action = "";
        }
        if(action === null){
            action = "";
        }
        console.log(thisPos)
    
        if (isEmpty) {
            return (
                <div class="col-3 grid_item">
                    <img onClick={()=>{this.setAlert("Please SignUp/Login To Play")}} src={userboxUri} style={{ cursor: "pointer", zIndex: "5", position: "relative", height: "125px", opacity: "80%" }}></img>
                    <img src={"card_back.png"} style={{ visibility: "hidden", height: "85px", marginLeft: "5px", opacity: "80%" }}></img>
                    <img src={"card_back.png"} style={{ visibility: "hidden", height: "85px", marginLeft: "5px", opacity: "80%" }}></img>
    
                    <img src="joinsign.png" style={{ opacity: "80%", backgroundColor: "#638596", height: "67px", width: "67px", zIndex: "1", position: "relative", marginLeft: "-212px", marginTop: "-30px" }}></img>
                    <p className="pixel_text" style={{ opacity: "80%", color: "white", fontSize: "12px", marginTop: "-33px", marginLeft: "15px" }}>{"empty"}</p>
                </div>)
        }
    
    
        if (isActive) {
            userboxUri = "userbox_active.png";
        }
        else {
            userboxUri = "userbox.png";
        }
        if (isSelf) {
            userboxUri = "userbox_self.png";
        }
        return (
    
            <div class="col-3 grid_item">
                <Tooltip trigger="click" placement="bottom" title={<div style={{ textAlign: "center", justifyContent: "center" }}>
                    <img src={uri} style={{ backgroundColor: "#638596", height: "120px", width: "120px" }} alt /><br />
                    <span className="pixel_text" style={{ color: "lightGray", fontSize: "10px", marginTop: "2px" }}>{username}</span><br />
                    <span className="pixel_text" style={{ color: "lightGray", fontSize: "10px", marginTop: "2px" }}>{"Win Rate: "+Math.floor(winRate*100)+"%"}</span><br />
                    <span className="pixel_text" style={{ color: "lightGray", fontSize: "10px", marginTop: "2px" }}>{"Total Profit: "+(totalProfit>0?"+":"")+totalProfit}</span>
                </div>}>
    
                    <img src={userboxUri} style={{ cursor: "pointer", zIndex: "5", position: "relative", height: "125px" }}></img>
                </Tooltip>
                <img src={cardA} style={{ visibility: gameOn ? "visible" : "hidden" , opacity: isFold ? "50%" : "100%", height: "85px", marginLeft: "5px" }}></img>
                <img src={cardB} style={{ visibility: gameOn ? "visible" : "hidden" , opacity: isFold ? "50%" : "100%", height: "85px", marginLeft: "5px" }}></img>
                <img src={uri} style={{ backgroundColor: "#638596", height: "67px", width: "67px", zIndex: "1", position: "relative", marginLeft: "-212px", marginTop: "-30px" }}></img>
    
                <div>
    
                    {action == "" ? <p className="pixel_text" style={{ color: "lightGray", fontSize: "12px", marginLeft: "15px" }}>{username}</p> : <p className="pixel_text" style={{ color: isWinner ? "yellow":"red", fontSize: "12px", marginLeft: "15px" }}>{action}</p>}
                    <p className="pixel_text" style={{ color: "white", fontSize: "12px", marginTop: "-65px", marginLeft: "15px" }}>{remainingChips}</p>
    
    
                    {currentHandAmount !== 0 ? <p className="pixel_text" style={{ color: "#1ef2e7", marginTop: "-158px", marginLeft: "15px" }}><span style={{ fontSize: "15px" }}>{'🌌'}</span><span style={{ fontSize: "10px" }}>{currentHandAmount}</span></p> : <p style={{ color: "#1ef2e7", marginTop: "-158px", marginLeft: "15px", visibility: "hidden" }}>{"1"}</p>}
                    <p className="pixel_text" style={{ visibility: isDealer ? "visible" : "hidden", fontSize: "15px", "borderRadius": "20%", "border": "solid white 2px", color: "white", "marginLeft": "75px", width: "30px", height: "30px", padding: "3px" }}><span style={{ marginLeft: "4px" }}>D</span></p><br />
                </div>
                {emoji !== -1 && emoji!== undefined ? <img src={`p_emojis/${emoji}.png`} style={{cursor:"pointer", height: "65px", width: "65px", zIndex: "5", position: "relative", marginLeft: "14px", marginTop: "-180px" }}></img> : null}
    
            </div>)
    }

    setAlert = (message) => {
        this.setState({alertVisible:true, alertMessage:message});
        setTimeout(() => {
            this.setState({alertVisible:false})
          }, 3500);
    }

    render() {
        if(this.state.chasingTime !== this.state.time){
            this.loadData();
        }
        console.log(this.state);
        const communityCards = this.state.communityCards;
        const alertVisible = this.state.alertVisible;
	    const alertMessage = this.state.alertMessage;

        return (
            <div>
                <div class="container">

                    <div class="row row-cols-9">
                        <ActionUI3 profits={this.state.profits}></ActionUI3>
                        <div class="col grid_item_q"></div>
                        <div class="col-4 grid_item_q"><Alert style={{ height: "40px", marginTop: "5px" }} message={<p style={{ color: "black", fontSize: "9px", "marginTop": "14px" }} className="pixel_text">{"As A Guest, You Can Only Spectate The Game."}</p>} type="info" closeText={<p className="pixel_text" style={{ fontSize: "12px", "marginTop": "14px" }}>X</p>} /></div>

                    </div>
                    <div class="row row-cols-9">
                        <div class="col grid_item_qq"></div>
                        <div class="col grid_item_qq"></div>
                    </div>
                    <div class="row row-cols-9">
                        <div class="col grid_item"></div>
                        <div class="col grid_item"></div>
                        {this.state.users_ui[0]}
                        <div class="col grid_item"></div>
                        {this.state.users_ui[1]}
                        <div class="col grid_item"></div>
                        {this.state.users_ui[2]}
                        <div class="col grid_item"></div>
                        <div class="col grid_item"></div>
                    </div>
                    <div class="row row-cols-9">
                        <div class="col grid_item_half"></div>
                        <div class="col grid_item_half"></div>
                        <div class="col grid_item_half"></div>
                        <div class="col grid_item_half"></div>
                        <div class="col grid_item_half"></div>
                        <div class="col grid_item_half"></div>
                        <div class="col grid_item_half"></div>
                    </div>
                    <div class="row row-cols-7">
                        {this.state.users_ui[7]}
                        <div class="col grid_item"></div>
                        {BoardUI(communityCards[0], communityCards[1], communityCards[2], communityCards[3], communityCards[4], this.state.state, this.state.gameOn)}
                        <div class="col grid_item"></div>
                        {this.state.users_ui[3]}
                    </div>
                    <div class="row row-cols-9">
                        <div class="col grid_item_half"></div>
                        <div class="col grid_item_half"></div>
                        <div class="col-5 grid_item_half" style={{textAlign:"center"}}><p style={{ color: "white", fontSize: "12px", "marginTop": "5px" }} className="pixel_text">{this.state.gameOn ? "Pot: "+this.state.pot : "Waiting For Game To Start..."}</p></div>
                        
                        <div class="col grid_item_half"></div>
                        <div class="col grid_item_half"></div>
                    </div>
                    <div class="row row-cols-9">
                        <div class="col grid_item"></div>
                        <div class="col grid_item"></div>
                        {this.state.users_ui[6]}
                        <div class="col grid_item"></div>
                        {this.state.users_ui[5]}
                        <div class="col grid_item"></div>
                        {this.state.users_ui[4]}
                        <div class="col grid_item"></div>
                        <div class="col grid_item"></div>
                    </div>
                    <div class="row row-cols-9">
                        <div class="col grid_item"></div>
                        <div class="col-3 grid_item" style={{display:"flex",justifyContent:"center"}}><Alert style={{visibility:alertVisible?"visible":"hidden", height:"30px", "marginTop":"0px"}} message={<p style={{color:"black", fontSize:"9px", "marginTop":"16px"}} className="pixel_text">{alertMessage}</p>} type="error"/></div>
                    </div>
                </div>
            
            <Link id="to_home" to="/"></Link>
            <InitialBuyinModal ref={this.buyinModal0} position={0}/>
            <InitialBuyinModal ref={this.buyinModal1} position={1}/>
            <InitialBuyinModal ref={this.buyinModal2} position={2}/>
            <InitialBuyinModal ref={this.buyinModal3} position={3}/>
            <InitialBuyinModal ref={this.buyinModal4} position={4}/>
            <InitialBuyinModal ref={this.buyinModal5} position={5}/>
            <InitialBuyinModal ref={this.buyinModal6} position={6}/>
            <InitialBuyinModal ref={this.buyinModal7} position={7}/>
            </div>
        )
    }

}


function requestJoin(position, amount, setAlert){
    const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
    };
    var requestUrl = `http://45.79.72.230:8080/games/join?username=${UserSession.getName()}&position=${position}&buyin=${amount}`;
    
    console.log(requestUrl)
    fetch(requestUrl, requestOptions)
    .then(response => response.text())
    .then(
      data => {
        console.log(data);
        if(data === "success"){
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
/*
function playerUI(uri, username, remainingChips, action, handA, handB, isActive, isSelf, isEmpty, isFold, currentHandAmount, isDealer, gameOn, totalProfit, winRate, isWinner, thisPos) {
    var userboxUri = "userbox.png";
    if (!handA) handA = "cardback";
    if (!handB) handB = "cardback";
    var cardA = cardMapping(handA);
    var cardB = cardMapping(handB);
    if(isWinner){
        action = "winner";
    }
    if(action === "null"){
        action = "";
    }
    if(action === null){
        action = "";
    }

    
    if (isEmpty) {
        return (

            <div class="col-3 grid_item" onClick={()=>{}}>

                <img src={userboxUri} style={{ cursor: "pointer", zIndex: "5", position: "relative", height: "125px", opacity: "80%" }}></img>
                <img src={"card_back.png"} style={{ visibility: "hidden", height: "85px", marginLeft: "5px", opacity: "80%" }}></img>
                <img src={"card_back.png"} style={{ visibility: "hidden", height: "85px", marginLeft: "5px", opacity: "80%" }}></img>

                <img src="joinsign.png" style={{ opacity: "80%", backgroundColor: "#638596", height: "67px", width: "67px", zIndex: "1", position: "relative", marginLeft: "-212px", marginTop: "-30px" }}></img>
                <p className="pixel_text" style={{ opacity: "80%", color: "white", fontSize: "12px", marginTop: "-33px", marginLeft: "15px" }}>{"empty"}</p>
               
            </div>)
    }


    if (isActive) {
        userboxUri = "userbox_active.png";
    }
    else {
        userboxUri = "userbox.png";
    }
    if (isSelf) {
        userboxUri = "userbox_self.png";
    }
    return (

        <div class="col-3 grid_item">
            <Tooltip trigger="click" placement="bottom" title={<div style={{ textAlign: "center", justifyContent: "center" }}>
                <img src={uri} style={{ backgroundColor: "#638596", height: "120px", width: "120px" }} alt /><br />
                <span className="pixel_text" style={{ color: "lightGray", fontSize: "10px", marginTop: "2px" }}>{username}</span><br />
                <span className="pixel_text" style={{ color: "lightGray", fontSize: "10px", marginTop: "2px" }}>{"Win Rate: "+Math.floor(winRate*100)+"%"}</span><br />
                <span className="pixel_text" style={{ color: "lightGray", fontSize: "10px", marginTop: "2px" }}>{"Total Profit: "+(totalProfit>0?"+":"")+totalProfit}</span>
            </div>}>

                <img src={userboxUri} style={{ cursor: "pointer", zIndex: "5", position: "relative", height: "125px" }}></img>
            </Tooltip>
            <img src={cardA} style={{ visibility: gameOn ? "visible" : "hidden" , opacity: isFold ? "50%" : "100%", height: "85px", marginLeft: "5px" }}></img>
            <img src={cardB} style={{ visibility: gameOn ? "visible" : "hidden" , opacity: isFold ? "50%" : "100%", height: "85px", marginLeft: "5px" }}></img>
            <img src={uri} style={{ backgroundColor: "#638596", height: "67px", width: "67px", zIndex: "1", position: "relative", marginLeft: "-212px", marginTop: "-30px" }}></img>

            <div>

                {action == "" ? <p className="pixel_text" style={{ color: "lightGray", fontSize: "12px", marginLeft: "15px" }}>{username}</p> : <p className="pixel_text" style={{ color: isWinner ? "yellow":"red", fontSize: "12px", marginLeft: "15px" }}>{action}</p>}
                <p className="pixel_text" style={{ color: "white", fontSize: "12px", marginTop: "-65px", marginLeft: "15px" }}>{remainingChips}</p>


                {currentHandAmount !== 0 ? <p className="pixel_text" style={{ color: "#1ef2e7", marginTop: "-158px", marginLeft: "15px" }}><span style={{ fontSize: "15px" }}>{'🌌'}</span><span style={{ fontSize: "10px" }}>{currentHandAmount}</span></p> : <p style={{ color: "#1ef2e7", marginTop: "-158px", marginLeft: "15px", visibility: "hidden" }}>{"1"}</p>}
                <p className="pixel_text" style={{ visibility: isDealer ? "visible" : "hidden", fontSize: "15px", "borderRadius": "20%", "border": "solid white 2px", color: "white", "marginLeft": "75px", width: "30px", height: "30px", padding: "3px" }}><span style={{ marginLeft: "4px" }}>D</span></p><br />
            </div>

        </div>)
}*/

function BoardUI(A, B, C, D, E, state, gameOn) {
    // diamond, spade, club, heart
    // A-K (1-13)

    return (
        < div class="col-5 grid_item">
            <div className="animate_card">
                {
                    state >= 3 ?
                        <Slide direction="up"   in={state >= 3} >
                            <img src={cardMapping(A)} style={{ height: "125px", marginLeft: "5px" }}></img>
                        </Slide> :
                        <img className="fade_in_card" src={"card_back.png"} style={{ height: "125px", marginLeft: "5px" }}></img>
                }
            </div>
            <div className="animate_card">
                {
                    state >= 3 ?
                        <Slide direction="up"   in={state >= 3} >
                            <img src={cardMapping(B)} style={{ height: "125px", marginLeft: "5px" }}></img>
                        </Slide> :
                        <img className="fade_in_card" src={"card_back.png"} style={{ height: "125px", marginLeft: "5px" }}></img>
                }
            </div>
            <div className="animate_card">
                {
                    state >= 3 ?
                        <Slide direction="up"   in={state >= 3} >
                            <img src={cardMapping(C)} style={{ height: "125px", marginLeft: "5px" }}></img>
                        </Slide> :
                        <img className="fade_in_card" src={"card_back.png"} style={{ height: "125px", marginLeft: "5px" }}></img>
                }
            </div>
            <div className="animate_card">
                {
                    state >= 4 ?
                        <Slide direction="up"   in={state >= 4} >
                            <img src={cardMapping(D)} style={{ height: "125px", marginLeft: "5px" }}></img>
                        </Slide> :
                        <img className="fade_in_card" src={"card_back.png"} style={{ height: "125px", marginLeft: "5px" }}></img>
                }
            </div>
            <div className="animate_card">
                {
                    state >= 5 ?
                        <Slide direction="up"   in={state >= 5} >
                            <img src={cardMapping(E)} style={{ height: "125px", marginLeft: "5px" }}></img>
                        </Slide> :
                        <img className="fade_in_card" src={"card_back.png"} style={{ height: "125px", marginLeft: "5px" }}></img>
                }
            </div>
        </div >)
}

function cardMapping(card) {
    if (card === null) {
        return "card_back.png"
    }
    if (card === "cardback") {
        return "card_back.png"
    }
    const cardMappingDict = { 'ha': 'h_A.gif', 'da': 'd_A.gif', 'sa': 's_A.gif', 'ca': 'c_A.gif', 'hk': 'h_K.gif', 'dk': 'd_K.gif', 'sk': 's_K.gif', 'ck': 'c_K.gif', 'hq': 'h_Q.gif', 'dq': 'd_Q.gif', 'sq': 's_Q.gif', 'cq': 'c_Q.gif', 'hj': 'h_J.gif', 'dj': 'd_J.gif', 'sj': 's_J.gif', 'cj': 'c_J.gif', 'h2': 'cards/row-1-column-5.png', 'd2': 'cards/row-2-column-5.png', 's2': 'cards/row-3-column-5.png', 'c2': 'cards/row-4-column-5.png', 'h3': 'cards/row-1-column-6.png', 'd3': 'cards/row-2-column-6.png', 's3': 'cards/row-3-column-6.png', 'c3': 'cards/row-4-column-6.png', 'h4': 'cards/row-1-column-7.png', 'd4': 'cards/row-2-column-7.png', 's4': 'cards/row-3-column-7.png', 'c4': 'cards/row-4-column-7.png', 'h5': 'cards/row-1-column-8.png', 'd5': 'cards/row-2-column-8.png', 's5': 'cards/row-3-column-8.png', 'c5': 'cards/row-4-column-8.png', 'h6': 'cards/row-1-column-9.png', 'd6': 'cards/row-2-column-9.png', 's6': 'cards/row-3-column-9.png', 'c6': 'cards/row-4-column-9.png', 'h7': 'cards/row-1-column-10.png', 'd7': 'cards/row-2-column-10.png', 's7': 'cards/row-3-column-10.png', 'c7': 'cards/row-4-column-10.png', 'h8': 'cards/row-1-column-11.png', 'd8': 'cards/row-2-column-11.png', 's8': 'cards/row-3-column-11.png', 'c8': 'cards/row-4-column-11.png', 'h9': 'cards/row-1-column-12.png', 'd9': 'cards/row-2-column-12.png', 's9': 'cards/row-3-column-12.png', 'c9': 'cards/row-4-column-12.png', 'h10': 'cards/row-1-column-13.png', 'd10': 'cards/row-2-column-13.png', 's10': 'cards/row-3-column-13.png', 'c10': 'cards/row-4-column-13.png' }
    return cardMappingDict[card]
}
