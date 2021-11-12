import Button from '@mui/material/Button'
import rinkeby from '../../rinkeby.js'

const Portfolio = (props) => {
  console.log('link address: ', rinkeby.linkContractAddress)
  console.log('portfolio wallet address: ', props.walletAddress)

  return (
    <>
      <div>Portfolio</div>
      <Button>Get Data</Button>
    </>
  )
}

export default Portfolio
