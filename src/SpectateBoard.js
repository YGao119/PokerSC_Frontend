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
import ActionUI3 from './ActionUI3'


export default class SpectateBoard extends Component {
    constructor(props) {
        super(props);
        this.state={
            users: [
                {
                    username: "Jason",
                    currentAction: "",
                    currentBet: "20",
                    remainingChips: "4021",
                    totalProfit: "130",
                    currentProfit: "135",
                    winRate: "13566",
                    hand: [""],
                },
                null,
                {
                    username: "jack",
                    currentAction: "",
                    currentBet: "20",
                    remainingChips: "4021",
                    totalProfit: "130",
                    currentProfit: "135",
                    winRate: "13566",
                    hand: ["",""],
                },
                null,
                null,
                null,
                null,
                null
            ],
            profits: {"test1":"+100", "test2":"+100", "test3":"+100"},
            communityCards: ["ck", "ha", "sj", "hq", "sk"],
            pot: 1234,
            selfHand: ["hA", "hK"],
            selfPostion: 0,
            minimumRaiseAmount: 0,
            actionPosition:0,
            checked: false,
            checked2: false,
            checked3: false,
            checkedPlayer: false,
        }
    }

    render() {
        
        setTimeout(() => {
            this.setState({checked:true});
        }, 1000);
        setTimeout(() => {
            this.setState({checked2:true});
        }, 2000);
        setTimeout(() => {
            this.setState({checked3:true});
        }, 3000);
        setTimeout(() => {
            this.setState({checkedPlayer:true});
        }, 1000);
        setTimeout(() => {
            this.setState({checkedPlayer:true});
        }, 1000);
        
        // playerUI(username, remainingChips, action, handA, handB, isActive, isSelf, isEmpty, isFold, currentHandAmount, isDealer) {
        const communityCards = this.state.communityCards;
        return (
            <div>
                <div class="container">
                    
                    <div class="row row-cols-9">
                        <ActionUI3 ></ActionUI3>
                        <div class="col grid_item_q"></div>
                        <div class="col-4 grid_item_q"><Alert style={{height:"40px", marginTop:"5px"}} message={<p style={{ color: "black", fontSize: "8px", "marginTop": "14px" }} className="pixel_text">{"Use Full Screen For Better Experience"}</p>} type="info" closeText={<p className="pixel_text" style={{ fontSize: "12px", "marginTop": "14px"}}>X</p>} /></div>
                        
                    </div>
                    <div class="row row-cols-9">
                        <div class="col grid_item_qq"></div>
                        <div class="col grid_item_qq"></div>
                    </div>
                    <div class="row row-cols-9">
                        <div class="col grid_item"></div>
                        <div class="col grid_item"></div>
                        {playerUI("0003","test1", 12, "", "", "", false, false, false, false, 20, false, this.state.checkedPlayer)}
                        <div class="col grid_item"></div>
                        
                        {playerUI("0003", "", 0, "", "", "", false, false, true, 0, false, this.state.checkedPlayer)}
                        <div class="col grid_item"></div>
                        {playerUI("0246","test3", 12, "", "", "", false, false, false, false, 50, true, this.state.checkedPlayer)}
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
                        {playerUI("0303","test1", 12424, "raise", "", "", true, false, false, false, 100, false, this.state.checkedPlayer)}
                        <div class="col grid_item"></div>
                        {BoardUI(communityCards[0], communityCards[1], communityCards[2], communityCards[3], communityCards[4], this.state.checked, this.state.checked2, this.state.checked3)}
                        <div class="col grid_item"></div>
                        {playerUI("","", 0, "", "", "", false, false, true, false, 0, false, this.state.checkedPlayer)}
                    </div>
                    <div class="row row-cols-9">
                        <div class="col grid_item_half"></div>
                        <div class="col grid_item_half"></div>
                        <div class="col grid_item_half"></div>
                        <div class="col grid_item_half"><p style={{ color: "white", fontSize: "12px", "marginTop": "5px" }} className="pixel_text">Pot: {this.state.pot}</p></div>
                        <div class="col grid_item_half"></div>
                        <div class="col grid_item_half"></div>
                        <div class="col grid_item_half"></div>
                    </div>
                    <div class="row row-cols-9">
                        <div class="col grid_item"></div>
                        <div class="col grid_item"></div>
                        {playerUI("3531","haha", 603, "fold",  "", "", false, false, false, true, 0, false, this.state.checkedPlayer)}
                        <div class="col grid_item"></div>
                        {playerUI("5126","Jason", 1212, "call", "", "", false, false, false, false, 100, false, this.state.checkedPlayer)}
                        <div class="col grid_item"></div>
                        {playerUI("0023","mcal", 20000, "check", "", "", false, false, false, false, 0, false, this.state.checkedPlayer)}
                        <div class="col grid_item"></div>
                        <div class="col grid_item"></div>
                    </div>
                    <div class="row row-cols-9">
                        <div class="col grid_item"></div>
                        <div class="col grid_item"></div>
                        <div class="col grid_item"></div>
                    </div>
                </div>

            </div>
        )
    }

}

function playerUI(uri, username, remainingChips, action, handA, handB, isActive, isSelf, isEmpty, isFold, currentHandAmount, isDealer, checkedPlayer) {
    var userboxUri = "userbox.png";
    if (isEmpty){
        return (

            <div class="col-3 grid_item">
                
                <img src={userboxUri} style={{  cursor: "pointer", zIndex:"5", position:"relative", height: "125px", opacity:"80%" }}></img>
                <img src={"card_back.png"} style={{ visibility:"hidden",height: "85px", marginLeft: "5px", opacity:"80%" }}></img>
                <img src={"card_back.png"} style={{visibility:"hidden", height: "85px", marginLeft: "5px", opacity:"80%" }}></img>
                
                <img src="joinsign.png" style={{  opacity:"80%", backgroundColor:"#638596", height: "67px", width: "67px", zIndex:"1", position:"relative", marginLeft:"-212px", marginTop:"-30px" }}></img>
                <p className="pixel_text" style={{  opacity:"80%",color: "white", fontSize: "12px", marginTop: "-33px", marginLeft: "15px" }}>{"empty"}</p>
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
    if (!handA) handA = "cardback";
    if (!handB) handB = "cardback";
    var cardA = cardMapping(handA);
    var cardB = cardMapping(handB);
    
    return (

        <div class="col-3 grid_item">
            <Tooltip trigger="click" placement="bottom" title={<div style={{textAlign:"center", justifyContent: "center"}}>
                <img src={"pfps/"+uri+".png"}  style={{ backgroundColor:"#638596", height: "120px", width: "120px"}}  alt/><br/>
                <span className="pixel_text" style={{ color: "lightGray", fontSize: "10px", marginTop:"2px"}}>{username}</span><br/>
                <span className="pixel_text" style={{ color: "lightGray", fontSize: "10px",marginTop:"2px"}}>{"Win Rate: 23%"}</span><br/>
                <span className="pixel_text" style={{ color: "lightGray", fontSize: "10px", marginTop:"2px"}}>{"Total Profit: 201"}</span>
                </div>}>
            
            <img src={userboxUri} style={{  cursor: "pointer",  zIndex:"5", position:"relative", height: "125px" }}></img>
            </Tooltip>
            <img src={cardA} style={{ visibility:isFold ? "hidden": "visible", height: "85px", marginLeft: "5px" }}></img>
            <img src={cardB} style={{ visibility:isFold ? "hidden": "visible", height: "85px", marginLeft: "5px" }}></img>
            <img src={"pfps/"+uri+".png"} style={{ backgroundColor:"#638596", height: "67px", width: "67px", zIndex:"1", position:"relative", marginLeft:"-212px", marginTop:"-30px" }}></img>
            
            <div>
                
            {action=="" ? <p className="pixel_text" style={{ color: "lightGray", fontSize: "12px", marginLeft:"15px" }}>{username}</p> : <p className="pixel_text" style={{ color: "red", fontSize: "12px", marginLeft: "15px" }}>{action}</p>}
            <p className="pixel_text" style={{ color: "white", fontSize: "12px", marginTop: "-65px", marginLeft: "15px" }}>{remainingChips}</p>
            
            
            {currentHandAmount !== 0 ? <p className="pixel_text" style={{ color: "#1ef2e7", marginTop: "-158px", marginLeft: "15px" }}><span style={{fontSize: "15px"}}>{'🌌'}</span><span style={{fontSize: "10px"}}>{currentHandAmount}</span></p>:<p style={{ color: "#1ef2e7", marginTop: "-158px", marginLeft: "15px", visibility:"hidden" }}>{"1"}</p>}
            <p className="pixel_text" style={{visibility:isDealer?"visible":"hidden", fontSize: "15px", "border-radius":"20%", "border":"solid white 2px", color:"white", "marginLeft":"75px", width:"30px", height:"30px", padding:"3px"}}><span style={{marginLeft:"4px"}}>D</span></p><br/>
            </div>
            
        </div>)
}

function BoardUI(A, B, C, D, E, checked, checked2, checked3) {
    // diamond, spade, club, heart
    // A-K (1-13)
    
    return (
        < div class="col-5 grid_item">
            <div className="animate_card">
                {
                checked?
                <Slide direction="up" mountOnEnter unmountOnExit  in={checked} >
                <img src={cardMapping(A)} style={{ height: "125px", marginLeft: "5px" }}></img>
                </Slide>:
                <img src={"card_back.png"} style={{ height: "125px", marginLeft: "5px" }}></img>
                }
            </div>
            <div className="animate_card">
                {
                checked?
                <Slide direction="up" mountOnEnter unmountOnExit  in={checked} >
                <img src={cardMapping(B)} style={{ height: "125px", marginLeft: "5px" }}></img>
                </Slide>:
                <img src={"card_back.png"} style={{ height: "125px", marginLeft: "5px" }}></img>
                }
            </div>
            <div className="animate_card">
                {
                checked?
                <Slide direction="up" mountOnEnter unmountOnExit  in={checked} >
                <img src={cardMapping(C)} style={{ height: "125px", marginLeft: "5px" }}></img>
                </Slide>:
                <img src={"card_back.png"} style={{ height: "125px", marginLeft: "5px" }}></img>
                }
            </div>
            <div className="animate_card">
                {
                checked2?
                <Slide direction="up" mountOnEnter unmountOnExit  in={checked2} >
                <img src={cardMapping(D)} style={{ height: "125px", marginLeft: "5px" }}></img>
                </Slide>:
                <img src={"card_back.png"} style={{ height: "125px", marginLeft: "5px" }}></img>
                }
            </div>
            <div className="animate_card">
                {
                checked3?
                <Slide direction="up" mountOnEnter unmountOnExit  in={checked3} >
                <img src={cardMapping(E)} style={{ height: "125px", marginLeft: "5px" }}></img>
                </Slide>:
                <img src={"card_back.png"} style={{ height: "125px", marginLeft: "5px" }}></img>
                }
            </div>
        </div >)
}

function cardMapping(card) {
    if (card === null){
        return "card_back.png"
    }
    if (card === "cardback") {
        return "card_back.png"
    }
    const cardMappingDict = { 'ha': 'h_A.gif', 'da': 'd_A.gif', 'sa': 's_A.gif', 'ca': 'c_A.gif', 'hk': 'h_K.gif', 'dk': 'd_K.gif', 'sk': 's_K.gif', 'ck': 'c_K.gif', 'hq': 'h_Q.gif', 'dq': 'd_Q.gif', 'sq': 's_Q.gif', 'cq': 'c_Q.gif', 'hj': 'h_J.gif', 'dj': 'd_J.gif', 'sj': 's_J.gif', 'cj': 'c_J.gif', 'h2': 'cards/row-1-column-5.png', 'd2': 'cards/row-2-column-5.png', 's2': 'cards/row-3-column-5.png', 'c2': 'cards/row-4-column-5.png', 'h3': 'cards/row-1-column-6.png', 'd3': 'cards/row-2-column-6.png', 's3': 'cards/row-3-column-6.png', 'c3': 'cards/row-4-column-6.png', 'h4': 'cards/row-1-column-7.png', 'd4': 'cards/row-2-column-7.png', 's4': 'cards/row-3-column-7.png', 'c4': 'cards/row-4-column-7.png', 'h5': 'cards/row-1-column-8.png', 'd5': 'cards/row-2-column-8.png', 's5': 'cards/row-3-column-8.png', 'c5': 'cards/row-4-column-8.png', 'h6': 'cards/row-1-column-9.png', 'd6': 'cards/row-2-column-9.png', 's6': 'cards/row-3-column-9.png', 'c6': 'cards/row-4-column-9.png', 'h7': 'cards/row-1-column-10.png', 'd7': 'cards/row-2-column-10.png', 's7': 'cards/row-3-column-10.png', 'c7': 'cards/row-4-column-10.png', 'h8': 'cards/row-1-column-11.png', 'd8': 'cards/row-2-column-11.png', 's8': 'cards/row-3-column-11.png', 'c8': 'cards/row-4-column-11.png', 'h9': 'cards/row-1-column-12.png', 'd9': 'cards/row-2-column-12.png', 's9': 'cards/row-3-column-12.png', 'c9': 'cards/row-4-column-12.png', 'h10': 'cards/row-1-column-13.png', 'd10': 'cards/row-2-column-13.png', 's10': 'cards/row-3-column-13.png', 'c10': 'cards/row-4-column-13.png' }
    return cardMappingDict[card]
}
