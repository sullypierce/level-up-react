import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { GameContext } from "../game/GameProvider"
import { EventContext } from "./EventProvider"


export const EventForm = () => {
    const history = useHistory()
    const { games, getGames} = useContext(GameContext)
    const { createEvent } = useContext(EventContext)
    const [currentEvent, setEvent] = useState({
        time: '12:00',
        description: "",
        date: "",
        gameId: 0
    })

    //get the list of games when this component loads so the form dropdown input can be populated
    useEffect(() => {
        getGames()
    }, [])

    //change currentEvent object each time an input field is changed
    const changeEventState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState[`${event.target.name}`] = event.target.value
        setEvent(newEventState)
    }

    //submit a new event object to the server
    const submitEvent = evt => {
        evt.preventDefault()
        if (currentEvent.gameId === 0 || currentEvent.date === "" || currentEvent.description === "") {
            window.alert('You must fill in every field!')
        } else {
            const newEvent = currentEvent
            newEvent.gameId = parseInt(newEvent.gameId)
            createEvent(newEvent)
            .then(() => history.push("/events"))
        }
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>{game.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date of the Event: </label>
                    <input type="date" name="date" className="form-control"
                        value={ currentEvent.date }
                        onChange={ changeEventState }>
                        
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="time">Time of the Event: </label>
                    <input type="time" name="time" className="form-control"
                        value={ currentEvent.time }
                        onChange={ changeEventState }>
                        
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Give People a Message: </label>
                    <input type="description" name="description" className="form-control"
                        value={ currentEvent.description }
                        onChange={ changeEventState }>
                        
                    </input>
                </div>
            </fieldset>

            {/* Create the rest of the input fields */}

            <button type="submit"
                onClick={submitEvent}
                className="btn btn-2 btn-sep icon-create">Create Event</button>
        </form>
    )
}