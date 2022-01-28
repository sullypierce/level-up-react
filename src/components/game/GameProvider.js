import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [ games, setGames ] = useState([])
    const [ gameTypes, setTypes ] = useState([])
    const [editGameId, setEditId] = useState(0)

    const getGames = () => {
        return fetch("http://localhost:8000/games", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGames)
    }

    const getOneGame = (id) => {
        return fetch(`http://localhost:8000/games/${id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
    }

    const createGame = (game) => {
        return fetch("http://localhost:8000/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(game)
         })
            .then(res => res.json())
    }

    const updateGame = (game) => {
        return fetch(`http://localhost:8000/games/${editGameId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(game)
         })
            .then(() => {
                setEditId(0)
            })
        }
    
    const getGameTypes = () => {
        return fetch("http://localhost:8000/gametypes", {
            headers: {
                Authorization: `Token ${localStorage.getItem("lu_token")}`
            }
         })
            .then(res => res.json())
            .then(setTypes)
    }

    return (
        <GameContext.Provider value={{ games, getGames, gameTypes, getGameTypes, createGame, updateGame, getOneGame, editGameId, setEditId }} >
            { props.children }
        </GameContext.Provider>
    )
}