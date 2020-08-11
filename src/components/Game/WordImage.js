import React from 'react';

import './../../app.scss';

const WordImage = (props) => {
   return <img src={require(`../../assets/${props.word}.png`)} alt='game-img' className="img"/>
}
export default WordImage;

// 