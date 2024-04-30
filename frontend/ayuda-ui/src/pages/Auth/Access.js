import React from 'react'
import './Access.css'

export const Access = () => {
  return (
    <div>
        <input className='accessCode' type="text" id="Name" name="Name" size="20" placeholder='Access Code' /><br />
        <input className='accessCodeSubmit' type="submit" name="submit" value="Enter" id="submit" />
    </div>
  )
}
