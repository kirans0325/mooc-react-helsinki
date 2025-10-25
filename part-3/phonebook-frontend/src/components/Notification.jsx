const Notification = ({ message, error }) => {
  if (!message) return null

  const style = {
    color: error ? 'red' : 'green',
    background: '#f4f4f4',
    border: `2px solid ${error ? 'red' : 'green'}`,
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px'
  }

  return <div style={style}>{message}</div>
}

export default Notification
