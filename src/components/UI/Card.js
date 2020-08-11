import React from 'react';

import '../../app.scss';

const Card = (props) => {
    return (
        <div className="card"> {props.children} </div>
    )
}

export default Card;