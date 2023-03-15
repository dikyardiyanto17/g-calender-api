import { FetchingEvents } from "../actions/actionType"

const initialState = {
    events: []
}

function eventsReducer(state = initialState, action) {
    switch (action.type) {
        case FetchingEvents:
            return { ...state, events: action.payload }
        default:
            return state
    }
}

export default eventsReducer