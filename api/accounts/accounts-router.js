const router = require('express').Router()
const Accounts = require('./accounts-model')
//import middleware:
const { checkAccountPayload, checkAccountId, checkAccountNameUnique } = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll()
    res.json(accounts)
  } catch {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    res.json(req.account)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const newAccount = await Accounts.create(req.body)
    res.status(201).json(newAccount)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkAccountPayload, checkAccountId, async (req, res, next) => {
  const newlyUpdatedAccount = await Accounts.updateById(req.params.id, req.body)
  try {
    res.json(newlyUpdatedAccount)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const { id } = req.params
    const choppingBlockAccount = await Accounts.getById(id)
    await Accounts.deleteById(id)
    res.json(choppingBlockAccount)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message || "Something went terribly wrong"
  })
})

module.exports = router;
