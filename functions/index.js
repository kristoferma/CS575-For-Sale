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
        res.status(200).send(newGameRef.key)
        return newGameRef.key
      })
      .catch(err => {
        res.status(500).send('Could not create new game')
      })
  })
)

exports.createNewRandomGame = functions.https.onRequest((req, res) => {
  req.query = { userID: 'Kristófer', playerCount: 3 }
  createNewGame(req, res).then(gameKey => {
    joinGame(req, res)
  })
})

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
        return res.sendStatus(300)

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
            startNewRound(gameID).then(() =>
              res.end(String(currentNumberOfPlayers))
            )
          } else res.end(String(currentNumberOfPlayers))
        })
    })
  })
)

startNewRound = gameID => {
  const db = admin.database()
  const gameRef = db.ref(`games/${gameID}`)

  return gameRef.once('value').then(gameData => {
    const game = gameData.val()

    if (!game.phase1) return startNewRoundPhase2(gameID)

    const phase1 = game.phase1
    const randomCards = Array.from(
      { length: game.numberOfPlayers },
      () => phase1.splice(Math.floor(Math.random() * phase1.length), 1)[0]
    )
    const updates = {
      numberOfTurn: game.numberOfTurn + 1,
      phase1,
      cardsInPlay: randomCards
    }

    newPlayerInfo = game.players.forEach((player, index) => {
      updates[`players/${index}/playerHasPlayed`] = false
      updates[`players/${index}/betAmount`] = 0
    })
    gameRef.update(updates)
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

      if (playerID != game.currentPlayerTurn || !game.phase1) {
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

        let newHand = player.hand
          ? player.hand.concat(cardGained)
          : [cardGained]

        const currentPlayerTurn = nextPlayersTurn(
          game.currentPlayerTurn,
          game.numberOfPlayers
        )

        gameRef
          .update({
            cardsInPlay,
            currentPlayerTurn,
            selectedCard: 8
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
        const betAmount = maxBet(game.players) + 1
        const currentPlayerTurn = nextPlayersTurn(
          game.currentPlayerTurn,
          game.numberOfPlayers
        )

        gameRef.update({
          [`/players/${playerID}/betAmount`]: betAmount,
          currentPlayerTurn
        })
      } else return res.status(400).end()
      res.status(200).end()
    })
  })
)

const maxBet = players => {
  let maxBet = 0
  players.forEach(player => {
    maxBet = Math.max(player.betAmount, maxBet)
  })
  return maxBet
}

const nextPlayersTurn = (currentPlayerTurn, numberOfPlayers) =>
  currentPlayerTurn == numberOfPlayers - 1 ? 0 : currentPlayerTurn + 1

startNewRoundPhase2 = gameID => {
  const db = admin.database()
  const gameRef = db.ref(`games/${gameID}`)

  return gameRef.once('value').then(gameData => {
    const game = gameData.val()

    if (!game.phase2) return false

    const phase2 = game.phase2
    const randomMoneyCards = Array.from(
      { length: game.numberOfPlayers },
      () => phase2.splice(Math.floor(Math.random() * phase2.length), 1)[0]
    )

    const updates = {
      numberOfTurn: game.numberOfTurn + 1,
      phase2,
      cardsInPlay: randomMoneyCards
    }

    newPlayerInfo = game.players.forEach((player, index) => {
      updates[`players/${index}/playerHasPlayed`] = false
    })
    gameRef.update(updates)
    return true
  })
}

exports.phase2Play = functions.https.onRequest((req, res) =>
  cors(req, res, () => {
    let { gameID, playerID, action } = req.query
    const db = admin.database()
    const gameRef = db.ref(`games/${gameID}`)

    gameRef.once('value').then(gameData => {
      const game = gameData.val()
      const player = game.players[playerID]

      if (player.playerHasPlayed === true) {
        return res.status(400).end()
      }

      const cardsInPlay = game.cardsInPlay
      card = Number(action)

      let hand = player.hand
      hand.splice(hand.indexOf(card), 1)

      gameRef
        .child('players/' + playerID)
        .update({
          playerHasPlayed: true,
          hand,
          selectedCard: card
        })
        .then(() => {
          gameRef.once('value').then(gameData => {
            const game = gameData.val()
            if (game.players.every(player => player.playerHasPlayed)) {
              cardInPlay = game.cardsInPlay.sort().reverse()
              cardsSelected = game.players
                .map((player, index) => ({
                  card: player.selectedCard,
                  player: index
                }))
                .sort((obj1, obj2) => obj1.card < obj2.card)

              const updates = {}
              cardsSelected.forEach(card => {
                moneyGained = game.players[card.player].moneyGained
                  ? game.players[card.player].moneyGained.concat(
                      cardsInPlay.pop()
                    )
                  : [cardsInPlay.pop()]

                updates[`players/${card.player}/moneyGained`] = moneyGained
                updates[`players/${card.player}/selectedCard`] = null
                updates[`players/${card.player}/playerHasPlayed`] = false
              })
              gameRef.update(updates)

              startNewRoundPhase2(gameID)
            }
            res.status(200).end()
          })
        })
    })
  })
)
