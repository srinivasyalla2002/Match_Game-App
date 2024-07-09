import './index.css'

const NavBar = props => {
  const {score, seconds} = props

  return (
    <nav className="nav-bar-container">
      <div className="logo-score-container">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="logo-img"
          />
        </div>
        <ul className="scores-container">
          <li>
            <p className="score-color">
              Score: <span className="text-color">{score}</span>
            </p>
          </li>
          <li className="timer-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              alt="timer"
              className="timer-img"
            />
            <p className="text-color">{seconds} sec</p>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
