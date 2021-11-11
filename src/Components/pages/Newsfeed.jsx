import { useState, useEffect } from 'react'
import {
  fetchEvents,
  fetchTrendingCoins,
  fetchCoinMarketData,
} from './fetchData'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'

const Newsfeed = () => {
  const [trendingCoins, setTrendingCoins] = useState([])
  const [events, setEvents] = useState([])

  const loadTrendingCoins = async () => {
    const trendingData = await fetchTrendingCoins()
    setTrendingCoins(trendingData)
  }

  const loadEvents = async () => {
    const eventsData = await fetchEvents()
    setEvents(eventsData)
  }

  const renderTrendingCoins = async () => {
    console.log('rendering trending: ', trendingCoins.coins)
  }

  const renderEvents = () => {
    console.log('rendering events: ', events.data)
    return events.data.map((el, key) => (
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
    ))
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      await loadTrendingCoins()
      await loadEvents()
    }
    const renderInitialData = async () => {
      renderTrendingCoins()
      renderEvents()
    }
    fetchInitialData()
    renderInitialData()
  }, [])

  return (
    <>
      <div>
        <h3>Trending Coins</h3>
        {JSON.stringify(trendingCoins)}
      </div>
      <div>
        <h3>Upcoming Events</h3>
        {events ? renderEvents() : <p>No Events</p>}
      </div>
    </>
  )
}

export default Newsfeed
