const Notification = ({ message, status }) => {
    if (message === null) {
        return null
    }

    const notificationStyle = {
        color: status === 'error' ? 'red' : 'green',
        background: 'lightgrey',
    }

    return (
        <div style={notificationStyle}>
            <div className={status === 'error' ? 'error' : 'success'}>
                {message}
            </div>
        </div>
    )
}

export default Notification