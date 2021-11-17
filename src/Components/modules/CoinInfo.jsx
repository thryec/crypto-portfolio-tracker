import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchCoinInfo } from '../pages/fetchData'

const Coin = () => {
  const params = useParams()
  const [isLoaded, setIsLoaded] = useState(false)
  const [info, setInfo] = useState([])

  // console.log('info page params: ', params)

  const getCoinInfo = async () => {
    try {
      const res = await fetchCoinInfo(params.name)
      console.log('info: ', res.symbol)
      setInfo(res)
      setIsLoaded(true)
    } catch (err) {
      console.log(err)
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
          <p>
            Market Capitalization: {info.market_data.market_cap.sgd} [#{info.market_cap_rank}]
          </p>
          <div>Insert Price Chart Here</div>
          <p>News: {info.status_updates[0]}</p>
          <p>Markets: {info.status_updates}</p>
          {/* <p> Description: {info.description.en}</p> */}
        </div>
      ) : (
        <h1> Loading... </h1>
      )}
    </>
  )
}

export default Coin
