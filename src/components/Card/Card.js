import React from 'react';
import './Card.css';

const Card = (props) => {
    return (
        <div className="card">
            <div className="id">{props.id}</div>
            <div className="title">{props.title}</div>
            <div className="body">{props.body}</div>
        </div>
    )
}

export default Card;