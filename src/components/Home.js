import React, { useState, useEffect } from 'react'
import SingleCard from './SingleCard'
import './Home.css'
// Images
import cover from '../cat-photos/match_cat_cover.png'
import abyssinian from '../cat-photos/abyssinian.png'
import birman from '../cat-photos/birman.jpg'
import chantilly from '../cat-photos/chantilly.jpg'
import chartreux from '../cat-photos/chartreux.jpg'
import devonrex from '../cat-photos/devonrex.png'
import mainecoon from '../cat-photos/mainecoon.jpg'
import manx from '../cat-photos/manx.jpg'
import ragamuffin from '../cat-photos/ragamuffin.jpg'
import ragdoll from '../cat-photos/ragdoll.jpg'
import russianblue from '../cat-photos/russianblue.jpg'

const cardImages = [
  { src: abyssinian, matched: false },
  { src: birman, matched: false },
  { src: chantilly, matched: false },
  { src: chartreux, matched: false },
  { src: devonrex, matched: false },
  { src: mainecoon, matched: false },
  { src: manx, matched: false },
  { src: ragamuffin, matched: false },
  { src: ragdoll, matched: false },
  { src: russianblue, matched: false },
]

function Home() {
  const [ cards, setCards ] = useState([])
  const [ turns, setTurns ] = useState(0)
  const [ choiceOne, setChoiceOne ] = useState(null)
  const [ choiceTwo, setChoiceTwo ] = useState(null)

  // Shuffle cards
  const shuffleCards = () => {
    const shuffled = [ ...cardImages, ...cardImages ]
    shuffled
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffled)
    setTurns(0)
  }
  // Set new game on home load
  useEffect(() => {
    shuffleCards()
  }, [])

  // Handle a choice
  const handleChoice = (card) => {
    if (choiceOne === null && choiceTwo === null) {
      setChoiceOne(card)
    } else {
      setChoiceTwo(card)
    }
  }

  useEffect(
    () => {
      if (choiceOne === choiceTwo && (choiceOne && choiceTwo)) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else if (choiceOne && choiceTwo) {
        resetTurn()
      }
    },
    [ choiceOne, choiceTwo ],
  )

  // Compare two selected cards
  // useEffect(
  //   () => {
  //     if (choiceOne === choiceTwo && (choiceOne && choiceTwo)) {
  //       console.log('matched.')
  //       setCards((prevCards) => {
  //         return prevCards.map((card) => {
  //           if (card.src === choiceOne.src) {
  //             return { ...card, matched: true }
  //           } else {
  //             return card
  //           }
  //         })
  //       })
  //       resetTurn()
  //     } else {
  //       resetTurn()
  //     }
  //   },
  //   [ choiceOne, choiceTwo ],
  // )

  // Reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prevTurns) => prevTurns + 1)
  }

  return (
    <React.Fragment>
      <h1>Match Cats!</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map((card, i) => {
          return (
            <SingleCard
              key={i}
              card={card.src}
              cover={cover}
              handleChoice={handleChoice}
            />
          )
        })}
      </div>
    </React.Fragment>
  )
}

export default Home
