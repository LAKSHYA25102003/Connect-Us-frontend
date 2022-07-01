import React from 'react'
import "./Feed.css"
import Share from '../share/Share'

export default function Feed() {
  return (
    <div className='feedContainer'>
      <div className="feedWrapper">
        <Share/>
      </div>
    </div>
  )
}
