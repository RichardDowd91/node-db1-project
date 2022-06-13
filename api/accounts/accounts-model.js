const db = require('../../data/db-config')

//select returns list of all matching objects (array)..why we do first()
//delete + update return a number of rows affected
//insert returns an array of id's of newly inserted (could be one)

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts')
    .where({ id })
    .first()
}

const getByName = name => {
  return db('accounts')
    .where({ name })
    .first()
}

const create = async account => {
  const [id] = await db('accounts')
    .insert(account)
  return getById(id)
}

const updateById = async (id, account) => {
  await db('accounts')
    .where({ id })
    .update(account)
  return getById(id)
}

const deleteById = async id => {
  let choppingBlockAccount = await getById(id)
  await db('accounts')
    .where({ id })
    .del()
  return choppingBlockAccount
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName
}
