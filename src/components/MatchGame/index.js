import {Component} from 'react'

import NavBar from '../NavBar'
import TabItem from '../TabItem'
import ThumbnailItem from '../ThumbnailItem'

import './index.css'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    const {tabsList, imagesList} = props
    // const index = Math.floor(Math.random() * imagesList.length)
    this.state = {
      score: 0,
      timeElapsedInSecond: 60,
      activeTabId: tabsList[0].tabId,
      randomImage: imagesList[0],
      gameOver: false,
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.decreaseTime, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  updateActiveTabId = tabId => {
    this.setState({
      activeTabId: tabId,
    })
  }

  getTabFilter = () => {
    const {imagesList} = this.props
    const {activeTabId} = this.state
    const tabFilter = imagesList.filter(
      eachImg => eachImg.category === activeTabId,
    )
    return tabFilter
  }

  isSameImage = id => {
    const {imagesList} = this.props
    const {randomImage, timeElapsedInSecond} = this.state
    const isSame = id === randomImage.id
    const index = Math.floor(Math.random() * imagesList.length)
    const randomObj = imagesList[index]
    // console.log(randomObj)
    if (timeElapsedInSecond === 60) {
      this.timerId = setInterval(this.decreaseTime, 1000)
    }
    if (isSame) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        randomImage: randomObj,
      }))
    } else {
      this.setState({
        gameOver: true,
      })
      clearInterval(this.timerId)
    }
  }

  renderGameStart = () => {
    const {tabsList} = this.props
    const {activeTabId, randomImage} = this.state
    const tabFilter = this.getTabFilter()
    // console.log(tabsList, imagesList)

    return (
      <div className="game-container">
        <img src={randomImage.imageUrl} alt="match" className="random-img" />
        <ul className="tabs-container">
          {tabsList.map(eachTab => (
            <TabItem
              tabDetails={eachTab}
              key={eachTab.tabId}
              updateActiveTabId={this.updateActiveTabId}
              isActive={eachTab.tabId === activeTabId}
            />
          ))}
        </ul>
        <ul className="app-list-container">
          {tabFilter.map(eachImg => (
            <ThumbnailItem
              thumbnailDetails={eachImg}
              key={eachImg.id}
              isSameImage={this.isSameImage}
            />
          ))}
        </ul>
      </div>
    )
  }

  playAgain = () => {
    this.setState({
      score: 0,
      timeElapsedInSecond: 60,
      gameOver: false,
    })
    this.timerId = setInterval(this.decreaseTime, 1000)
  }

  decreaseTime = () => {
    const {timeElapsedInSecond} = this.state
    if (timeElapsedInSecond > 0) {
      this.setState(prevState => ({
        timeElapsedInSecond: prevState.timeElapsedInSecond - 1,
      }))
    } else {
      this.setState({
        gameOver: true,
      })
      clearInterval(this.timerId)
    }
  }

  renderGameOverCard = () => {
    const {score} = this.state
    // console.log(score)
    return (
      <div className="result-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
          alt="trophy"
          className="trophy-icon"
        />
        <p className="your-score-text">YOUR SCORE</p>
        <p className="result-score">{score}</p>
        <button
          type="button"
          className="play-again-btn"
          onClick={this.playAgain}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
            alt="reset"
            className="reset-icon"
          />
          <p>PLAY AGAIN</p>
        </button>
      </div>
    )
  }

  gameTimeOver = () => {
    this.setState({
      gameOver: true,
    })
    clearInterval(this.timerId)
  }

  render() {
    const {score, gameOver} = this.state
    const {timeElapsedInSecond} = this.state
    // const timeOver = timeElapsedInSecond === 0

    return (
      <div className="app-container">
        <NavBar score={score} seconds={timeElapsedInSecond} />
        <div className="responsive-container">
          {gameOver ? this.renderGameOverCard() : this.renderGameStart()}
        </div>
      </div>
    )
  }
}

export default MatchGame
