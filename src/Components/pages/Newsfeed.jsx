import { useState, useEffect } from 'react'
import { fetchEvents, fetchTrendingCoins } from './fetchData'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import Stack from '@mui/material/Stack'

const Newsfeed = () => {
  const [events, setEvents] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const loadEvents = async () => {
    const eventsData = await fetchEvents()
    setEvents(eventsData)
  }
  const renderEvents = () => {
    if (isLoaded) {
      return events.data.map((el, key) => (
        <Card key={key} sx={{ maxWidth: 400 }}>
          <CardActionArea>
            <CardMedia component="img" height="140" image={el.screenshot} alt={el.title} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {el.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {el.description}
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
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      await loadEvents()
      setIsLoaded(true)
    }
    fetchInitialData()
  }, [])

  return (
    <>
      <div>
        <h3>Upcoming Events</h3>
        <Stack spacing={2} direction="row">
          {!events ? <p>No Events</p> : renderEvents()}
        </Stack>
      </div>
    </>
  )
}

export default Newsfeed
