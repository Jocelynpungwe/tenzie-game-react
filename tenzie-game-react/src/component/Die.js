import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceOne , faDiceTwo , faDiceThree 
        , faDiceFour, faDiceFive , faDiceSix } from '@fortawesome/free-solid-svg-icons'

export default function Die(props) {

    const element = props.value === 1 ? <FontAwesomeIcon icon={faDiceOne} className="dice-number" /> 
                    : props.value === 2 ? <FontAwesomeIcon icon={faDiceTwo} className="dice-number" />
                    : props.value === 3 ? <FontAwesomeIcon icon={faDiceThree} className="dice-number" />
                    : props.value === 4 ? <FontAwesomeIcon icon={faDiceFour} className="dice-number" />
                    : props.value === 5 ? <FontAwesomeIcon icon={faDiceFive} className="dice-number" />
                    : <FontAwesomeIcon icon={faDiceSix} className="dice-number" />

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={() => props.holdDice(props.id)}
        >
            <h2 className="die-num">{element}</h2>
        </div>
    )
}