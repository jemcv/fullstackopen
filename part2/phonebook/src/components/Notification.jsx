const Notification = ({ message, status }) => {
    if (message === null) {
        return null
    }
    return (
        <div>
            {status === 'error' ? <div className="error">{message}</div> : <div className="success">{message}</div>}
        </div>
    )
}

export default Notification