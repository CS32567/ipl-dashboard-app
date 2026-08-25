/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {PieChart, Pie, Cell, Legend, Tooltip} from 'recharts'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {teamData: {}, isLoading: true}

  componentDidMount() {
    this.getTeamMatches()
  }

  onClickBack = () => {
    const {history} = this.props
    history.replace('/')
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {id} = match.params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const latestMatch = {
      umpires: data.latest_match_details.umpires,
      result: data.latest_match_details.result,
      manOfTheMatch: data.latest_match_details.man_of_the_match,
      id: data.latest_match_details.id,
      date: data.latest_match_details.date,
      venue: data.latest_match_details.venue,
      competingTeam: data.latest_match_details.competing_team,
      competingTeamLogo: data.latest_match_details.competing_team_logo,
      firstInnings: data.latest_match_details.first_innings,
      secondInnings: data.latest_match_details.second_innings,
      matchStatus: data.latest_match_details.match_status,
    }

    const recentMatches = data.recent_matches.map(each => ({
      id: each.id,
      competingTeam: each.competing_team,
      competingTeamLogo: each.competing_team_logo,
      result: each.result,
      matchStatus: each.match_status,
    }))

    this.setState({
      teamData: {
        bannerUrl: data.team_banner_url,
        latestMatch,
        recentMatches,
      },
      isLoading: false,
    })
  }

  getMatchStatistics = () => {
    const {teamData} = this.state
    const {recentMatches} = teamData

    let won = 0
    let lost = 0
    let drawn = 0

    recentMatches.forEach(each => {
      if (each.matchStatus === 'Won') {
        won += 1
      } else if (each.matchStatus === 'Lost') {
        lost += 1
      } else {
        drawn += 1
      }
    })

    return [
      {
        name: 'Won',
        value: won,
      },
      {
        name: 'Lost',
        value: lost,
      },
      {
        name: 'Drawn',
        value: drawn,
      },
    ]
  }

  render() {
    const {teamData, isLoading} = this.state

    const statisticsData = isLoading ? [] : this.getMatchStatistics()

    return (
      <div className="team-matches-container">
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <>
            <button
              type="button"
              className="back-button"
              onClick={this.onClickBack}
            >
              Back
            </button>

            <img
              src={teamData.bannerUrl}
              alt="team banner"
              className="team-banner"
            />

            <LatestMatch latestMatch={teamData.latestMatch} />

            <h1 className="recent-matches-heading">Recent Matches</h1>

            <ul className="recent-matches-list">
              {teamData.recentMatches.map(each => (
                <MatchCard matchDetails={each} key={each.id} />
              ))}
            </ul>

            <div className="statistics-container">
              <h1 className="statistics-heading">Match Statistics</h1>

              <PieChart width={400} height={300}>
                <Pie
                  data={statisticsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#18ed66" />
                  <Cell fill="#e31a1a" />
                  <Cell fill="#f7db00" />
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </>
        )}
      </div>
    )
  }
}

export default TeamMatches
