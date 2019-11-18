const bodyParser = require('body-parser')
const express = require('express')

const teams = require('./teams.json')

const app = express()

app.get('/teams', (request, response) => {
  response.send(teams)
})

app.get('/teams/:input', (request, response) => {
  const requestInfo = request.params.input
  const teamByParams = teams.filter(team => {
    return (
      team.id === Number(requestInfo) ||
      team.abbreviation.toUpperCase() === requestInfo.toUpperCase()
    )
  })
  return teamByParams.length
    ? response.send(teamByParams)
    : response.sendStatus(404)
})
app.use(bodyParser.json())
app.post('/teams', (request, response) => {
  let {
    id,
    location,
    mascot,
    abbreviation,
    conference,
    division
  } = request.body

  if (!location || !mascot || !abbreviation || !conference || !division) {
    response
      .status(400)
      .send(
        'The following are required:  id, location, mascot, abbreviation, conference, division'
      )
  }
  id = Object.keys(teams).length + 1
  const newTeams = {
    id,
    location,
    mascot,
    abbreviation,
    conference,
    division
  }
  // console.log(autoCount)
  teams.push(newTeams)
  //   response.sendStatus(201)
  response.status(201).send(newTeams)
})
const server = app.listen(1377, () => {
  console.log('Listening on port 1337')
})
module.exports = server
