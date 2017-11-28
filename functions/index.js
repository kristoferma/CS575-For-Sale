const functions = require('firebase-functions')

const cors = require('cors')({ origin: true })

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const initalGameState = (numberOfPlayers, creatorUserID) => {
  return {
    phase1: Array.from({ length: 30 }, (value, index) => index + 1),
    numberOfTurn: 0,
    currentPlayerTurn: 0,
    numberOfPlayers,
    players: [
      {
        userID: creatorUserID,
        playerNumber: 1,
        money: numberOfPlayers <= 4 ? 18 : 14,
        betAmount: 0,
        playerHasPlayed: false,
        hand: []
      }
    ],
    cardsInPlay: Array(numberOfPlayers).fill(0),
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
      const currentNumberOfPlayers = Object.keys(game.players).length
      if (currentNumberOfPlayers == game.numberOfPlayers)
        return res.status(300).send('Game is already full')

      gamePlayersRef
        .update({
          [currentNumberOfPlayers]: {
            userID: userID,
            playerNumber: currentNumberOfPlayers + 1,
            money: game.numberOfPlayers <= 4 ? 18 : 14,
            betAmount: 0,
            playerHasPlayed: false,
            hand: []
          }
        })
        .then(() => {
          if (currentNumberOfPlayers + 1 === game.numberOfPlayers) {
            startNewGame(gameID).then(() => res.status(200).send(gameID))
          } else res.status(200).send(gameID)
        })
        .catch(err => {
          console.error(err)
          res.status(500).end(error)
        })
    })
  })
)

startNewRound = gameID => {
  const db = admin.database()
  const gameRef = db.ref(`games/${gameID}`)

  return gameRef.once('value').then(gameData => {
    const game = gameData.val()

    if (!game.phase1) return false

    const phase1 = game.phase1
    const randomCards = Array.from(
      { length: game.numberOfPlayers },
      () => phase1.splice(Math.floor(Math.random() * phase1.length), 1)[0]
    )
    gameRef.update({
      numberOfTurn: game.numberOfTurn + 1,
      phase1,
      cardsInPlay: randomCards
    })
    return true
  })
}

exports.phase1Play = functions.https.onRequest((req, res) =>
  cors(req, res, () => {
    let { gameID, playerID, action } = req.query
    const db = admin.database()
    const gameRef = db.ref(`games/${gameID}`)

    gameRef.once('value').then(gameData => {
      const game = gameData.val()

      if (playerID != game.currentPlayerTurn) {
        return res.status(400).end()
      }
      const player = game.players[playerID]

      if (action == 'fold') {
        const moneySpent =
          game.cardsInPlay.length === 1
            ? player.betAmount
            : Math.ceil(player.betAmount / 2)

        const newMoney = player.money - moneySpent
        const cardsInPlay = game.cardsInPlay
        const cardGained = cardsInPlay
          .sort()
          .reverse()
          .pop()

        const newHand = player.hand
          ? player.hand.push(cardGained)
          : [cardGained]

        const currentPlayerTurn = nextPlayersTurn(
          game.currentPlayerTurn,
          game.numberOfPlayers
        )

        gameRef
          .update({
            cardsInPlay,
            currentPlayerTurn
          })
          .then(() => {
            return gameRef.child('players/' + playerID).update({
              playerHasPlayed: true,
              hand: newHand,
              money: newMoney
            })
          })
          .then(() => {
            if (cardsInPlay.length == 0) startNewRound(gameID)
          })
      } else if (action == 'bet') {
        const betAmount = maxBet(players) + 1
        const currentPlayerTurn =
          game.currentPlayerTurn == game.currentNumberOfPlayers
            ? 1
            : game.currentPlayerTurn + 1
      } else return res.status(400).end()
      res.status(200).end()
    })
  })
)

const maxBet = players => {
  let maxBet = 0
  players.forEach(player => {
    maxBet = max(player.betAmount, maxBet)
  })
  return maxBet
}

const nextPlayersTurn = (currentPlayerTurn, numberOfPlayers) =>
  currentPlayerTurn == numberOfPlayers - 1 ? 0 : currentPlayerTurn + 1
