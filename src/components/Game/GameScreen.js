import React, { Component } from "react";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";

import Card from "../UI/Card";
import Banner from "../UI/Banner";
import WordImage from "./WordImage";

class GameScreen extends Component {
  state = {
    draggedLetters: "",
    score: 0,
    banner: {show: false, type: ''}
  };


  handleDrop = (ev) => {
    // 1. Make elements disappear when dropped
    const allLetters = this.props.current.letters;
    const letterIndex = allLetters.indexOf(ev.dragData);
    if (letterIndex > -1) {
     allLetters.splice(letterIndex, 1);
    }
    // 2. Replace empty card with the letter dragged
    ev.target.innerText = ev.dragData; 
    this.setState({
      draggedLetters: [...this.state.draggedLetters, ev.target.innerHTML].join('')
    });
    /// 3. After all the cards are filled, check if the word formed is equal to the current word
    if(this.state.draggedLetters.length === this.props.current.word.length) {
      if(this.props.current.word === this.state.draggedLetters) {
        this.setState({banner: {show: true, type: 'success'}, score: this.state.score + 1});
      } else {
        this.setState({banner: {show: true, type: 'failed'}});
      }
      setTimeout(
        () => {this.setState(
          {draggedLetters: "",
          banner: {show: false, type: ''}
        }) 
        this.props.nextRound(this.state.score)}, 
        3000
      );
    } 
  }

  render() {
    const {
      current: { word, letters },
    } = this.props;
    return (
      <div>
      {this.state.banner.show ? <Banner word={word} type={this.state.banner.type}/> : 
      <div className="game">
        <div className="rounds">{this.props.rounds}/11</div>
        <div className="word-img_container">
          <WordImage word={word} />
        </div>
        <div className="droppable-container">
            {React.Children.toArray([...word].map(() => <DropTarget targetKey="dnd" onHit={(e) => this.handleDrop(e)}> <Card/></DropTarget>))}
        </div>
        <div className="letters_container">
          {React.Children.toArray(
            letters.map((cur) => (
              <DragDropContainer
                disappearDraggedElement
                targetKey="dnd"
                dragElemOpacity="1"
                dragData={cur}
              >
                <Card>{cur}</Card>
              </DragDropContainer>
            ))
          )}
        </div>  
      </div>
    }
    </div>
    );
  }
}

export default GameScreen;