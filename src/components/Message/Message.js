import React from 'react'

function Message({message}) {
    const displayMessage = ()=>{
        setTimeout(()=>{
            return (
                <p>{message}</p>
            )
        }, 1000)
    }
  return (
    <div className='message-container'>
        {displayMessage()}
    </div>
  )
}

export default Message