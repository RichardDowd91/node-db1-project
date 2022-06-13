const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body
  if (name === undefined || budget === undefined) {
    res.status(400).json({ message: "name and budget are required" })
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  } else if (typeof budget !== 'number' || isNaN(budget)) {
    res.status(400).json({ message: "budget of account must be a number" }) 
  } else if (Number(budget) < 0 || Number(budget) > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" })
  } else {
    req.body.name = name.trim()
    next()
  }
}

exports.checkAccountId = async (req, res, next) => {
  const { id } = req.params
  const account = await Accounts.getById(id)
  if (!account) {
    res.status(404).json({ message: "account not found" })
  } else {
    req.account = account
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const { name } = req.body
  const account = await Accounts.getByName(name.trim())
  if (account) {
    res.status(400).json({ message: "that name is taken" })
  } else {
    next()
  }
}