"use client";

import { useState } from "react";

const badges = {
    "Fire" : "Fire", 
    "Water" : "Water",
    "Earth" : "Earth"
} 


export function Badge(props){
    return(
        <div>
            <p>{badges[props.badge] || "Undefined"}</p>
        </div>
    )
}