import React, { Component } from 'react';

import GameScreen from './components/Game/GameScreen';

import './app.scss';

class App extends Component {
  state = {
    alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g','h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v','w', 'x', 'y', 'z'],
    words: ['bola', 'dado', 'cavalo', 'macaco', 'jacaré', 'lua', 'sapato', 'fada', 'pipoca', 'rato', 'vela'],
    current: {word: '', letters: []},
    gamePlaying: false,
    rounds: 0
  }

  generateRandomWord = (words) => {
    const randomWord = this.randomize(words);
    this.setState({ current: {word: randomWord, letters: randomWord.split('')} }, () => this.generateLetters());
  }

  generateLetters = () => {
    const letters = [];
    for (let i = 0; i < 12 - this.state.current.letters.length; i++) {
      letters.push(this.randomize(this.state.alphabet));
    }
    this.setState({current: { word: this.state.current.word, letters: this.shuffle([...this.state.current.letters, ...letters])}});
  }

  shuffle = (array) => {
    for(let i = array.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array;
  }

  randomize = (arr) => {
    const randomItem = arr[Math.floor(Math.random() * arr.length)];
    return randomItem;
  }

  roundHandler = (score) => {
    if (this.state.rounds === 12) {
      this.setState({gamePlaying: false});
    } else {
      const allWords = [...this.state.words]
      const wordIndex = allWords.indexOf(this.state.current.word);
      if (wordIndex > -1) {
        allWords.splice(wordIndex, 1);
      }
      this.setState({
        gamePlaying: true,
        rounds: this.state.rounds + 1,
        score: score
        });
      this.generateRandomWord(allWords);
    }
  }

  newGameHandler = () => {
    this.setState({gamePlaying: true, rounds: 1, score: 0})
  }

  finishGameHandler = () => {
    this.setState({gamePlaying: false})
  }
  
  render() {
    let screenContent = <div className="home"> 
      <img src={require('./assets/logo.png')} className="logo" alt="logo"/>
      <h2 className="title"> Vamos brincar com as letrinhas? </h2>
      <p className="text"> Observe a figura e procure as letras para formar as palavras. </p>
      <button className="btn" onClick={this.roundHandler}>Jogar!</button>
      <img src={require('./assets/letrinhas-start.png')} alt="logo" className="letrinhas"/> 
</div>
    if (this.state.gamePlaying && this.state.rounds < 12) {
      screenContent = (
        <GameScreen
              words={this.state.words}
              current={this.state.current} 
              rounds={this.state.rounds} 
              nextRound={this.roundHandler}
              finishGame={this.finishGameHandler}/>
      )
    } else if (this.state.gamePlaying && this.state.rounds === 12) {
      screenContent = (
        <div className="home">
                <h2 className="title"> Parabéns! </h2>
                <img src={require('./assets/letrinhas-finish.png')} alt="finish-game" className="letrinhas"/>
                <p className="text"> Sua pontuação foi {this.state.score}! </p>
                <button className="btn" onClick={this.newGameHandler}>Jogar Novamente!</button>
        </div>
      )
    }

    return (
      <div className="app">   
        <div className="container">
          {screenContent}
        </div>
      </div> 
    );
  }
}

export default App;
