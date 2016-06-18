const transactionsRouter = require('./routes/transactions');
const accountsRouter = require('./routes/accounts');
const customersRouter = require('./routes/customers');
const branchesRouter = require('./routes/branches');

module.exports = function router(app) {
  app.use('/transactions', transactionsRouter);
  app.use('/accounts', accountsRouter);
  app.use('/customers', customersRouter);
  app.use('/branches', branchesRouter);
};
