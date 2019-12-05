const bodyParser = require('body-parser')
const express = require('express')
const models = require('./models')

const app = express()

app.get('/teams', async (request, response) => {
  const teams = await models.Teams.findAll()
  response.send(teams)
})

app.get('/teams/:input', async (request, response) => {
  const requestInfo = request.params.input
  const teamByParams = await models.Teams.findAll({
    where: {
      [models.Op.or]: [
        {
          id: requestInfo
        },
        { abbreviation: requestInfo }
      ]
    }
  })

  return teamByParams.length
    ? response.send(teamByParams)
    : response.sendStatus(404)
})

app.use(bodyParser.json())
app.post('/teams', async (request, response) => {
  const { location, mascot, abbreviation, conference, division } = request.body

  if (!location || !mascot || !abbreviation || !conference || !division) {
    response
      .status(400)
      .send(
        'The following are required:   location, mascot, abbreviation, conference, division'
      )
  }

  const newTeams = await models.Teams.create({
    location,
    mascot,
    abbreviation,
    conference,
    division
  })

  response.status(201).send(newTeams)
})
const server = app.listen(1377, () => {
  console.log('Listening on port 1337')
})
module.exports = server
