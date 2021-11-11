import { useState, useEffect } from 'react'
import { fetchEvents, fetchTrendingCoins } from './fetchData'
import CoinRowItem from './CoinRowItem'

const Newsfeed = () => {
  const [events, setEvents] = useState([])
  const [trendingCoins, setTrendingCoins] = useState([])

  const loadTrendingCoins = async () => {
    console.log('fetching trending coins')
    const trendingData = await fetchTrendingCoins()
    console.log('trending: ', trendingData.coins)
    setTrendingCoins(trendingData)
  }

  const renderTrendingCoins = async () => {}

  const loadEvents = async () => {
    console.log('fetching events')
    const eventsData = await fetchEvents()
    console.log('events: ', eventsData)
    setEvents(events)
  }

  const renderEvents = async () => {}

  useEffect(() => {
    loadEvents()
    loadTrendingCoins()
  }, [])

  return (
    <>
      <div>
        <h3>Trending Coins</h3>
        {JSON.stringify(trendingCoins)}
      </div>
      <div>
        <h3>Upcoming Events</h3>
        {JSON.stringify(events)}
      </div>
    </>
  )
}

export default Newsfeed
