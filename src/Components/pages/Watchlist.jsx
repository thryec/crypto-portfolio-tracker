import { useContext } from 'react'
import WatchlistContext from '../context/WatchlistContext'

const Watchlist = () => {
  const watchlist = useContext(WatchlistContext)

  console.log('watchlist component:', watchlist)
  return <>Watchlist</>
}

export default Watchlist
