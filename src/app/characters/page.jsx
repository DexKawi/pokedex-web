import React from 'react'
import { Header } from '../components/Header'
import PokemonGrids from '../components/PokemonCard'

export default function Page(){
    return (
        <div className="pt-12">
            <Header/>
            <PokemonGrids/>
        </div>
    )
}