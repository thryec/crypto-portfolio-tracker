import { useState, useEffect } from 'react'
import { fetchEvents, fetchTrendingCoins } from './fetchData'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import Stack from '@mui/material/Stack'

const newsAPI =
  'https://cryptonews-api.com/api/v1/category?section=general&items=50&token=ekvr5cmd3gepqtufjsimcqe7wzrcztreys2dkcse'

const Newsfeed = () => {
  const [events, setEvents] = useState([])
  const [news, setNews] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const loadEvents = async () => {
    const eventsData = await fetchEvents()
    setEvents(eventsData)
  }
  const renderEvents = () => {
    if (isLoaded) {
      return events.data.map((el, key) => (
        <Card key={key} sx={{ maxWidth: 500 }}>
          <CardActionArea>
            <CardMedia component="img" height="200" image={el.screenshot} alt={el.title} />
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

  const fetchNews = async () => {
    const res = await fetch(newsAPI)
    const data = await res.json()
    setNews(data.data)
    // console.log('news data: ', data.data)
  }

  const renderNews = () => {
    if (isLoaded) {
      return news.map((el, key) => (
        <Card key={key} sx={{ maxWidth: 700 }}>
          <CardActionArea href={el.news_url}>
            <CardMedia component="img" height="200" image={el.image_url} alt={el.title} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {el.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {el.text}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))
    }
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await loadEvents()
        await fetchNews()
        setIsLoaded(true)
      } catch (err) {
        console.log('failed to load news with error: ', err)
        alert('Failed to fetch news.')
      }
    }
    fetchInitialData()
  }, [])

  return (
    <>
      <div>
        <Stack spacing={18} direction="row">
          <div>
            <h3>Latest News</h3>
            {!news ? <p>No News</p> : renderNews()}
          </div>
          <div>
            <h3>Upcoming Events</h3>

            {!events ? <p>No Events</p> : renderEvents()}
          </div>
        </Stack>
      </div>
    </>
  )
}

export default Newsfeed
