import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchCoinInfo } from '../pages/fetchData'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import Stack from '@mui/material/Stack'

const Coin = () => {
  const params = useParams()
  const [isLoaded, setIsLoaded] = useState(false)
  const [info, setInfo] = useState([])
  const [coinNews, setCoinNews] = useState([])

  const newsAPI1 = 'https://cryptonews-api.com/api/v1?tickers='
  const newsAPI2 = '&items=50&token=isa4mz5oj4ypxo7eedcv1vjesqahx9rftufg2ktz'

  // console.log('info page params: ', params)

  const getCoinInfo = async () => {
    try {
      const res = await fetchCoinInfo(params.name)
      await fetchNews(res.symbol)
      console.log('coinInfo: ', res)
      setInfo(res)
      setIsLoaded(true)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchNews = async (id) => {
    const res = await fetch(newsAPI1 + id + newsAPI2)
    const data = await res.json()
    setCoinNews(data.data)
    console.log('coin news: ', data)
  }

  const renderNews = () => {
    if (isLoaded) {
      return coinNews.map((el, key) => (
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
    getCoinInfo()
  }, [])

  return (
    <>
      {isLoaded ? (
        <div>
          <img src={info.image.thumb} alt="logo" />
          <h1> {info.name}</h1>
          <h1> {info.market_data.current_price.sgd} SGD </h1>
          <h3>
            Market Cap: {info.market_data.market_cap.sgd} [#{info.market_cap_rank}]
          </h3>
          <Stack spacing={10} direction="row">
            <div>
              <h3>News</h3>
              {renderNews()}
            </div>
            {/* <p>Markets: {info.status_updates}</p> */}
          </Stack>
        </div>
      ) : (
        <h1> Loading... </h1>
      )}
    </>
  )
}

export default Coin
