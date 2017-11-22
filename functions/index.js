const functions = require('firebase-functions')

const cors = require('cors')({ origin: true })

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const initalGameState = (numberOfPlayers, creatorUserID) => {
  return {
    phase1: Array(30).fill(0),
    numberOfTurn: 0,
    currentPlayerTurn: 1,
    numberOfPlayers,
    players: [
      {
        userID: creatorUserID,
        playerNumber: 1,
        money: numberOfPlayers <= 4 ? 18 : 14,
        playerHasPlayed: false
      }
    ],
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
    let { userID, playerCount } = req.query
    playerCount = Number(playerCount)
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
    const gameRef = db.ref(`games/${gameID}`)
    gameRef.once('value').then(gameData => {
      const game = gameData.val()
      console.log(game)
      const currentNumberOfPlayers = Object.keys(game.players).length
      if (currentNumberOfPlayers == game.numberOfPlayers)
        return res.status(300).send('Game is already full')
      gamePlayersRef
        .push({
          userID: userID,
          playerNumber: currentNumberOfPlayers + 1,
          money: game.numberOfPlayers <= 4 ? 18 : 14,
          playerHasPlayed: false
        })
        .catch(err => {
          console.error(err)
          res.status(500).end(error)
        })
        .then(() => {
          res.status(200).send(gameID)
        })
        .catch(err => {
          console.error(err)
          res.status(500).end(error)
        })
    })
  })
)

startGame = gameID => {
  const { userID, gameID } = req.query
  const db = admin.database()

  const gameRef = db.ref(`games/${gameID}`)

  gameRef.once('value').then(gameData => {
    if (gameData.numberOfTurn == 0) {
      gameRef.update({ numberOfTurn: 1 })
      return true
    } else {
      return false
    }
  })
}
