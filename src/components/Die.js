import React from "react";

export default function Die(props){
    const styles ={
        background: props.isHeld? "#59E391":"#ffffff"     
    }

    return(
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
            >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}