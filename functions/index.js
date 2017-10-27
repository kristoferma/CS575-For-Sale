const functions = require('firebase-functions')

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const initalGameState = (numberOfPlayers, creatorUserId) => {
  return {
    phase1: Array(30).fill(0),
    money:
      numberOfPlayers <= 4
        ? Array(numberOfPlayers).fill(18)
        : Array(numberOfPlayers).fill(14),
    numberOfTurn: 0,
    currentPlayerId: 0,
    players: [creatorUserId],
    playersThatHavePlayed: Array(numberOfPlayers).fill(false),
    phase2: [
      0,
      0,
      2,
      2,
      3,
      3,
      4,
      4,
      5,
      5,
      6,
      6,
      7,
      7,
      8,
      8,
      9,
      9,
      10,
      10,
      11,
      11,
      12,
      12,
      13,
      13,
      14,
      14,
      15,
      15
    ]
  }
}

exports.createNewGame = functions.https.onRequest((req, res) => {
  const db = admin.database()
  //const userId = req.query.userId;
  //const playerCount = req.query.playerCount;
  const { userId, playerCount } = req.query

  const gamesRef = db.ref('games')
  const usersRef = db.ref('users/' + userId)
  const newGameRef = gamesRef.push()
  usersRef
    .set({ currentGameId: newGameRef.key })
    .then(() => {
      const newGameState = initalGameState(playerCount, userId)
      return newGameRef.set(newGameState)
    })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      console.error(err)
      res.send(500)
    })
})

// This might have to change
exports.joinGame = functions.https.onRequest((req, res) => {
  const db = admin.database()
  const { userId, gameId } = req.query

  const gamePlayersRef = db.ref(`games/${gameId}/players`)
  const usersRef = db.ref(`users/${userId}`)
  usersRef
    .set({ currentGameId: gameId })
    .then(() => {
      return gamePlayersRef.push(userId)
    })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      console.error(err)
      res.send(500)
    })
})
