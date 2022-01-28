import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export const GameList = (props) => {
    const { games, getGames, setEditId } = useContext(GameContext)

    useEffect(() => {
        getGames()
    }, [])

    const history = useHistory()

    return (
        <article className="games">
        <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
            setEditId(0)
            history.push({ pathname: "/games/new" })
        }}
        >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">

                        <div className="game__name">{game.name} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <button className="btn btn-3"
                                    onClick={() => {
                                        setEditId(game.id)
                                        history.push({ pathname: `/games/${game.id}/edit` })
                                    }}
                                    >Edit</button>
                    </section>
                })
            }
        </article>
    )
}