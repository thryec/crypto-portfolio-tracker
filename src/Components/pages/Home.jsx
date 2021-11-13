import { useState, useEffect } from 'react'
import { fetchTrendingCoins } from './fetchData'
import CoinRowItem from './CoinRowItem'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActions } from '@mui/material'
import Stack from '@mui/material/Stack'

const Home = (props) => {
  const [trendingCoins, setTrendingCoins] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const loadTrendingCoins = async () => {
    const trendingData = await fetchTrendingCoins()
    setTrendingCoins(trendingData)
  }

  const renderTrendingCoins = async () => {
    if (isLoaded) {
      return trendingCoins.coins.map((el, id) => (
        <Card sx={{ maxWidth: 345 }}>
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
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
              continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))
    }
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      await loadTrendingCoins()
      setIsLoaded(true)
    }
    fetchInitialData()
  }, [])

  const fetchedData = props.allMarketData.map((el, key) => {
    return (
      <>
        <CoinRowItem
          key={key}
          tokenName={el[0].name}
          tokenId={el[0].id}
          symbol={el[0].symbol}
          currentPrice={el[0].current_price}
          marketCap={el[0].market_cap}
          mCapRank={el[0].market_cap_rank}
          change24h={el[0].price_change_percentage_24h}
          volume={el[0].total_volume}
          circSupply={el[0].circulating_supply}
          watchlist={props.watchlist}
          setWatchlist={props.setWatchlist}
        />
      </>
    )
  })

  return (
    <>
      {props.isLoaded ? (
        <div>
          <div>
            <h3>🔥 Trending 🔥</h3>
            <Button>render coins</Button>
            <Stack spacing={2} direction="row">
              {isLoaded ? renderTrendingCoins() : <p>No Trending Coins</p>}
            </Stack>
          </div>
          <h3>All Coins</h3>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Watchlist</TableCell>
                  <TableCell>Rank</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>24h%</TableCell>
                  <TableCell>Market Cap</TableCell>
                  <TableCell>Volume</TableCell>
                  <TableCell>Circulating Supply</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{fetchedData}</TableBody>
            </Table>
          </TableContainer>
          {/* {allCoins} */}
        </div>
      ) : (
        <h1> Loading... </h1>
      )}
    </>
  )
}

export default Home
