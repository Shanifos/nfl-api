const express = require("express")
const teams = require("./teams.json")

const app = express()

app.get("/teams", (request, response) => {
  response.send(teams)
})

app.get("/teams/:input", (request, response) => {
  const teamByParams = teams.filter(team => {
    const requestInfo = request.params.input
    return (
      team.id === Number(requestInfo) ||
      team.abbreviation === requestInfo.toUpperCase()
    )
  })
  teamByParams.length ? response.send(teamByParams) : response.sendStatus(404)
})

const server = app.listen(1377, () => {
  console.log("Listening to 1377")
})
