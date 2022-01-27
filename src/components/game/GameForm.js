import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes } = useContext(GameContext)

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
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

        // Send POST request to your API
        createGame(game)
            .then(() => history.push("/games"))
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
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
                    <label htmlFor="skillLevel">Number of Players: </label>
                    <input type="text" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Game Type: </label>
                    <select type="text" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}>
                            {
                                gameTypes.map(gameType => 
                                <option value={gameType.id} >
                                    {gameType.label}
                                </option>)
                            }
                        </select>
                </div>
            </fieldset>
            

            {/* You create the rest of the input fields for each game property */}

            <button type="submit"
                onClick={submitGame}
                className="btn btn-primary">Create</button>
        </form>
    )
}