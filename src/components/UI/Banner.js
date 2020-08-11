import React from 'react';

import Card from './Card';

const Banner = (props) => {
    return (
        <div className="banner">
            <h2 className="title"> {props.type === "success" ? "Você acertou!" : "Você errou!" }</h2>    
            <img src={require(`../../assets/letrinhas-${props.type}.png`)} alt={`letrinhas-${props.type}`} className="letrinhas"/> 
            <p className="text"> A palavra é: </p>
            <div className="droppable-container"> {React.Children.toArray([...props.word].map(cur => <Card> {cur} </Card>))} </div>
        </div>
    )
}

export default Banner;