import './index.css'

const LatestMatch = props => {
  const {latestMatch} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    venue,
    result,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = latestMatch

  return (
    <div className="latest-match-container">
      <div>
        <p>{competingTeam}</p>
        <p>{date}</p>
        <p>{venue}</p>
        <p>{result}</p>
      </div>

      <img
        src={competingTeamLogo}
        alt={`latest match ${competingTeam}`}
        className="latest-match-logo"
      />

      <div>
        <p>{firstInnings}</p>
        <p>{secondInnings}</p>
        <p>{manOfTheMatch}</p>
        <p>{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
