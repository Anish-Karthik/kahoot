"use client"

import React from 'react'
import { useActivePlayers } from './active-players'

const PlayerCount = () => {
  const playerCount = useActivePlayers(state => state.getActivePlayersCount())
  return (
    <h3>{playerCount}</h3>
  )
}

export default PlayerCount
