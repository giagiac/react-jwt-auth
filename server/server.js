const basePath = "/endpoint"

const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const userdb = JSON.parse(fs.readFileSync('./users.json', 'utf-8'))

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(
  jsonServer.defaults()
)

const SECRET_KEY = '72676376'

const expiresIn = '1h'

const wishesData = require('./wishes.json')
const couponsData = require('./coupons.json')
const productReviews = require('./productreviews.json')
const offerte = require('./offerte.json')

const coupon = require('./coupon.json')
const prenotazione = require('./prenotazione.json')
const offerta = require('./offerta.json')

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

function isLoginAuthenticated({ username, password }) {
  return userdb.users.findIndex(user => user.username === username && user.password === password) !== -1
}

function isRegisterAuthenticated({ username }) {
  return userdb.users.findIndex(user => user.username === username) !== -1
}

server.post(basePath + '/api/v1/auth/register', (req, res) => {
  const { email, company_email, password } = req.body
  res.status(200).json({
    id: 123456
  })
  // console.log(req.body)
  // if (isRegisterAuthenticated({ email }) || isRegisterAuthenticated({ company_email })) {
  //   const status = 401
  //   const message = 'Email already exist'
  //   res.status(status).json({ status, message })
  //   return
  // }

  // let last_item_id = 0

  // fs.readFile('./users.json', (err, data) => {
  //   if (err) {
  //     const status = 401
  //     const message = err
  //     res.status(status).json({ status, message })
  //     return
  //   }
  //   data = JSON.parse(data.toString())

  //   last_item_id = data.users[data.users.length - 1].id

  //   data.users.push({ id: last_item_id + 1, username: username, password: password })
  //   let writeData = fs.writeFile('./users.json', JSON.stringify(data), (err, result) => {
  //     if (err) {
  //       const status = 401
  //       const message = err
  //       res.status(status).json({ status, message })
  //       return
  //     }
  //   })
  // })
  // //const access_token = createToken({ username, password })
  // //res.status(200).json({ access_token })
  // res.status(200).json({
  //   id: last_item_id + 1
  // })
})

server.post(basePath + '/api/v1/auth/check', (req, res) => {
  const { token } = req.body
  console.log(req.body)
  const user = userdb.users.find(user => user.username === req.body.email)
  res.status(200).json({
    userRole: user.userRole
  })
})

server.post(basePath + '/api/v1/auth/login', (req, res) => {
  const { username, password } = req.body
  console.log(req.body)
  if (!isLoginAuthenticated({ username, password })) {
    const status = 401
    const message = 'Incorrect Username or Password'
    res.status(status).json({ status, message })
    return
  }
  const access_token = createToken({ username, password })
  res.status(200).json({ access_token, email: username })
})

server.post(basePath + '/api/v1/auth/reset-password', (req, res) => {
  const { email } = req.body
  console.log(email)
  res.status(200).json({})
})

// SELLER

server.post(basePath + '/api/v1/auth/seller-register', (req, res) => {
  console.log(req.body)
  res.status(200).json({})
})

server.get(basePath + '/api/v1/seller/readQR/vc=:vc&cs=:cs', (req, res) => {
  console.log(req.body)
  res.status(200).json({
    id: parseInt(Math.random() * 100),
    type: 'OFF',
    data: {
      code: 'ABCABCABCABCABCABCABC',
      value: 123,
      discountType: 'V',
      description: 'Con questo coupon hai diritto ad uno dei seguenti servizio...',
      titolo: 'Giornata fortunata!',
      type: 'S',
      reference: [
        'https://quofind.prosyt.it/servizio/prima',
        'https://quofind.prosyt.it/servizio/seconda',
        'https://quofind.prosyt.it/servizio/terza',
        'https://quofind.prosyt.it/servizio/quarta',
        'https://quofind.prosyt.it/servizio/quinta'
      ]
    }
  })
})

server.get(basePath + '/api/v1/seller/object/:type/:id', (req, res) => {
  console.log(req.originalUrl.split(basePath + '/')[5])

  switch (req.originalUrl.split(basePath + '/')[5]) {
    case 'offerta':
      res.status(200).json(offerta)
      break
    case 'coupon':
      res.status(200).json(coupon)
      break
    case 'prenotazione':
      res.status(200).json(prenotazione)
      break
  }
})

server.get(basePath + '/api/v1/seller/:id', (req, res) => {
  console.log(req.query.id)
  res.status(200).json({
    cognome: 'CO',
    company: 'COM',
    company_email: 'test@gmail.com',
    nome: 'nome',
    password: '123456',
    passwordVerification: '123456',
    piva_cf: '12',
    ragionesociale: 'RAG',
    paymentmethods: [
      {
        type: 'B',
        iban: 'ILMIOIBAN',
        bic: 'ILMIOBIC',
        accountowner: 'Giacomo Lavermicocca'
      },
      {
        type: 'P',
        email: 'lamiaemail@paypal.com'
      },
      {
        type: 'C',
        ccnumber: '1234567812345678',
        ccholder: 'NOME SULLA CARTA',
        expiremonth: '01',
        expireyear: '23'
      }
    ]
  })
})

server.get(basePath + '/', (req, res) => {
  console.log(req.query.id)
})

server.put(basePath + '/api/v1/seller/:id', (req, res) => {
  console.log(req.query.id)
  res.status(200).json({
    id: 1234567
  })
})

server.post(basePath + '/api/v1/seller/addemployee', (req, res) => {
  console.log(req.body)
  res.status(200).json({})
})

server.post(basePath + '/api/v1/seller/customer', (req, res) => {
  console.log(req.body)
  res.status(200).json({})
})

// CUSTOMERS

server.get(basePath + '/api/v1/customer/wishes', (req, res) => {
  console.log(req.body)
  res.status(200).json(wishesData)
})

server.get(basePath + '/api/v1/customer/coupons', (req, res) => {
  console.log(req.body)
  res.status(200).json(couponsData)
})

server.get(basePath + '/api/v1/customer/couponsSaved', (req, res) => {
  console.log(req.body)
  const couponsSaved = couponsData.slice(0, 3)
  res.status(200).json(couponsSaved)
})

server.get(basePath + '/api/v1/customer/couponsItem', (req, res) => {
  console.log(req.body)
  const coupon = couponsData.find(it => it.link === req.query.link)
  res.status(200).json(coupon)
})

server.get(basePath + '/api/v1/user/productreviews/:id', (req, res) => {
  console.log(req.body)
  res.status(200).json(productReviews)
})

server.get(basePath + '/api/v1/customer/offert', (req, res) => {
  console.log(req.body)
  res.status(200).json(offerte)
})

server.get(basePath + '/api/v1/user/:id', (req, res) => {
  console.log(req.query.id)
  res.status(200).json({
    name: "Nome dell'utente",
    surname: "Cognome dell'utente",
    birthdate: '01.02.2020',
    email: 'pippo@pippo.it',
    password: '123456',
    passwordVerification: '123456',
    gender: 'M',
    paymentmethods: [
      {
        type: 'B',
        iban: 'ILMIOIBAN',
        bic: 'ILMIOBIC',
        accountowner: 'Giacomo Lavermicocca'
      },
      {
        type: 'P',
        email: 'lamiaemail@paypal.com'
      },
      {
        type: 'C',
        ccnumber: '1234567812345678',
        ccholder: 'NOME SULLA CARTA',
        expiremonth: '01',
        expireyear: '23'
      }
    ]
  })
})

server.put(basePath + '/api/v1/user/:id', (req, res) => {
  console.log(req.query.id)
  res.status(200).json({
    id: 1234567
  })
})

server.listen(5002, () => {
  console.log('Running fake api json server')
})
