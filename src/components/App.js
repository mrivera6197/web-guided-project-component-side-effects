import React, { useState, useEffect } from 'react'
// TASK 1 - import the axios lib from node_modules
import axios from 'axios'

// TASK 2 - import the contants from constants/index.js
import { API_KEY, BASE_URL } from '../constants/index.js'

import Details from './Details'

export default function App() {
  const [friends, setFriends] = useState([])
  const [currentFriendId, setCurrentFriendId] = useState(null)

  const openDetails = id => {
    setCurrentFriendId(id)
  }

  const closeDetails = () => {
    setCurrentFriendId(null)
  }

  // axios.get('http://localhost:4000/friends?api_keyxyz').then().catch()
  useEffect(() => { 
    const fetchFriends = () => {
      axios.get(`${BASE_URL}/friends?api_key=${API_KEY}`)
      .then(res => {
        setFriends(res.data)
      })
      .catch(err => {
        debugger
      })
    }
    fetchFriends()
  
  }, []) //without empty array, component re-renders anytime state or props are altered, guaranteed axios request is happening and will crash tab
  //use effect is how we schedule arbitrary code to run 

  // TASK 3 - make an effect that runs after FIRST DOM surgery
  // caused by the first render only. You'll need `useEffect` from React.
  // The effect should consist of a call to the API using axios.
  // On success, set the array of friend objects from the API into state.

  const Friend = props => (
    <div className='friend'>
      {props.info.name}
      <button onClick={() => openDetails(props.info.id)}>
        See details
      </button>
    </div>
  )

  return (
    <div className='container'>
      <h1>Some of my friends:</h1>
      {
        // If the initial value of `friends` state weren't an empty array,
        // this would crash due to invoking `map` method on non-array.
        // We'd need a guard against this.
        friends.map(fr => {
          return <Friend key={fr.id} info={fr} />
        })
      }
      {
        currentFriendId && <Details friendId={currentFriendId} close={closeDetails} />
      }
    </div>
  )
}
