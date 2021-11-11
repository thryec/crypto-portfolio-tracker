import { useState, useEffect } from 'react'
import { fetchEvents } from './fetchData'

const Newsfeed = () => {
  const [events, setEvents] = useState([])

  const loadEvents = async () => {
    console.log('fetching events')
    const eventsData = await fetchEvents()
    console.log('events: ', eventsData)
    setEvents(events)
  }

  useEffect(() => {
    loadEvents()
  }, [])

  return (
    <>
      <div></div>
    </>
  )
}

export default Newsfeed
