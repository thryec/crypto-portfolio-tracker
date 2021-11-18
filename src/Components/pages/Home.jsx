import { useState, useEffect } from 'react'
import { fetchTrendingCoins, fetchCoinMarketData } from './fetchData'
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
import { CardActionArea } from '@mui/material'
import Stack from '@mui/material/Stack'

const Home = (props) => {
  const [trendingCoins, setTrendingCoins] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [btcPrice, setBtcPrice] = useState(0)

  const loadTrendingCoins = async () => {
    const trendingData = await fetchTrendingCoins()
    setTrendingCoins(trendingData)
  }

  const getBtcPrice = async () => {
    const data = await fetchCoinMarketData('bitcoin')
    const price = data[0].current_price
    setBtcPrice(price)
  }

  const goToCoin = () => {
    console.log('coin clicked')
  }

  const renderTrendingCoins = () => {
    if (isLoaded) {
      return trendingCoins.coins.map((el, id) => (
        <Card key={id} sx={{ maxWidth: 400, maxHeight: 280 }}>
          <CardActionArea onClick={goToCoin}>
            <CardMedia component="img" height="140" image={el.item.large} alt="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {el.item.name}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                <div> Market Cap: # {el.item.market_cap_rank} </div>
                <div> Price: $ {Math.floor(el.item.price_btc * btcPrice * 100) / 100} </div>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))
    }
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      await loadTrendingCoins()
      await getBtcPrice()
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
            <h2>🔥 Trending 🔥</h2>
            <Stack spacing={2} direction="row">
              {isLoaded ? renderTrendingCoins() : <p>No Trending Coins</p>}
            </Stack>
          </div>
          <h2>All Coins</h2>
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
        <p> Loading... </p>
      )}
    </>
  )
}

export default Home
