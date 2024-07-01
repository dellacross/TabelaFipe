import React from 'react'
import './styles.css'

const RankingCard = (props) => {
    return (
        <div 
            id="ranking-card" 
            className={props.currDot !== props.id ? "display-none" : ""}
        >
            <header>{props.id}</header>
        </div>
    )
}

export default RankingCard