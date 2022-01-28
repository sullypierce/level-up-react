import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes, getOneGame, editGameId, updateGame, setEditId } = useContext(GameContext)

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: "",
        numberOfPlayers: "0",
        name: "",
        maker: "",
        gameTypeId: 1
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
        if (editGameId != 0) {
            getOneGame(editGameId).then(game => setCurrentGame({
                skillLevel : game.skill_level,
                numberOfPlayers: game.number_of_players,
                maker: game.maker,
                gameTypeId: game.gametype.id,
                name: game.name
            }))
        }
    }, [])


    const changeGameState = (event) => {
        const newGameState = { ...currentGame }
        newGameState[`${event.target.name}`] = event.target.value
        setCurrentGame(newGameState)
    }

    const submitGame = evt => {
        // Prevent form from being submitted
        evt.preventDefault()

        const game = {
            maker: currentGame.maker,
            name: currentGame.name,
            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
            skillLevel: currentGame.skillLevel,
            gametypeId: parseInt(currentGame.gameTypeId)
        }
        if (editGameId.id === 0) {
            createGame(game)
            .then(() => history.push("/games"))
        } else {
            updateGame(game)
            .then(() => history.push("/games"))
        }
        // Send POST request to your API
        
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">{currentGame.id === 0
                                ? "Register New"
                                : "Edit"} Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentGame.name}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="text" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select type="text" name="gameTypeId" required autoFocus className="form-control"
                        onChange={changeGameState} value={currentGame.gameTypeId}>
                            {
                                gameTypes.map(gameType => 
                                <option value={gameType.id} key= {gameType.id}>
                                    {gameType.label}
                                </option>)
                            }
                        </select>
                </div>
            </fieldset>
            

            {currentGame.id === 0
                                ? <button className="btn btn-3"
                                    onClick={submitGame}
                                    >Save New Game</button>
                                : <button className="btn btn-2"
                                    onClick={submitGame}
                                    >Edit Game</button>}
        </form>
    )
}