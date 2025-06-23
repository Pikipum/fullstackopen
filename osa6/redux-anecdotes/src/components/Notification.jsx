import { useSelector } from "react-redux"
import { showNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification !== '') {
    setTimeout(() => {
      dispatch(showNotification(''))
    }, 5000)
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }

}

export default Notification