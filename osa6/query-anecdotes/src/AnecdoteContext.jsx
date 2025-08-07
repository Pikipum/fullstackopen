import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "VOTE":
            return `You voted for ${action.payload.content}`
        case "ADD":
            return `Anecdote ${action.payload} added`
        case "CLEAR":
            return ''
        case "ERROR_SHORT":
            return `Anecdote too short, must have length 5 or more`
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const anecdoteAndDispatch = useContext(NotificationContext)
    return anecdoteAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const anecdoteAndDispatch = useContext(NotificationContext)
    return anecdoteAndDispatch[1]
}

export default NotificationContext