import React, { Component } from 'react';

import logo from './../../assets/logo.png';
import letrinhas from './../../assets/letrinhas-start.png'


class StartGameScreen extends Component {
    state = {
        

    }

    render() {
        return (
            <div className="home">
                <img src={logo} alt="logo"/>
                <h2 className="title"> Vamos brincar com as letrinhas? </h2>
                <p className="text"> Observe a figura e procure as letras para formar as palavras. </p>
                <button className="btn" onClick={this.roundHandler}>Jogar!</button>
                <img src={letrinhas} alt="logo" className="letrinhas"/>
            </div>
        )
    }    
}

export default StartGameScreen;