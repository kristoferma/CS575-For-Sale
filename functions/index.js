const functions = require('firebase-functions')

const cors = require('cors')({ origin: true })

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

exports.createNewGame = functions.https.onRequest((req, res) =>
  cors(req, res, () => {
    const db = admin.database()
    //const userId = req.query.userId;
    //const playerCount = req.query.playerCount;
    const { userID, playerCount } = req.query
    const gamesRef = db.ref('games')
    const newGameRef = gamesRef.push()
    const newGameState = initalGameState(playerCount, userID)
    return newGameRef
      .set(newGameState)
      .then(() => {
        cors(req, res, () => res.status(200).send(newGameRef.key))
      })
      .catch(err => {
        console.error(err)
        cors(req, res, () => res.status(500).send('Could not create new game'))
      })
  })
)

exports.joinGame = functions.https.onRequest((req, res) =>
  cors(req, res, () => {
    const db = admin.database()
    const { userID, gameID } = req.query

    const gamePlayersRef = db.ref(`games/${gameID}/players`)

    gamePlayersRef
      .push({ userID })
      .then(() => {
        res.status(200).send(gameID)
      })
      .catch(err => {
        console.error(err)
        res.status(500).end()
      })
  })
)
