import React, { useState } from 'react'
import './styles.css'
import Wrapper from '../../parts/Wrapper'
import RankingCard from '../../components/RankingCard'

const Rankings = () => {

  const cards = [1, 2, 3, 4, 5]
  const [currDot, setCurrDot] = useState(3)

  const handleClick = (id) => {
    if((id === 1 && currDot < 5) || (id === -1 && currDot > 1)) setCurrDot(currDot+id)
  }

  return (
    <Wrapper>
      <main id="ranking-main">
        <button 
          onClick={() => handleClick(-1)} 
          disabled={currDot === cards[0]}
        >
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <section>
          <RankingCard id={1} currDot={currDot} />
          <RankingCard id={2} currDot={currDot} />
          <RankingCard id={3} currDot={currDot} />
          <RankingCard id={4} currDot={currDot} />
          <RankingCard id={5} currDot={currDot} />
        </section>
        <footer>
          {
            cards.map(index => (
              <h3 id={index} className={index === currDot ? "curr-dot" : "slider-dot"}>&#x2022;</h3>
            ))
          }  
        </footer>
        <button 
          onClick={() => handleClick(1)}
          disabled={currDot === cards[cards.length-1]}
        >
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </button>
      </main>
    </Wrapper>
  )
}

export default Rankings