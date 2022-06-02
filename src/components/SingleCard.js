import React from 'react'
import './SingleCard.css'

function SingleCard({ card, cover, handleChoice }) {
  const handleClick = () => {
    handleChoice(card)
  }

  return (
    <div className='card'>
      <div>
        <img className='front' src={card} alt='card front' />
        <img
          className='back'
          src={cover}
          alt='card back'
          onClick={handleClick}
        />
      </div>
    </div>
  )
}

export default SingleCard
