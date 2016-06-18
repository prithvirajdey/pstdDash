const express = require('express');
const rethinkFactory = require('../../rethink-factory');
const r = rethinkFactory();

module.exports = function entityRouteFactory(entityName) {
  // eslint-disable-next-line new-cap
  const router = express.Router();

  router.get('/', (req, res, next) => {
    r
      .table(entityName)
      .orderBy({ index: 'createdAt' })
      .run()
      .then(result => {
        res.json(result);
        next();
      })
      .catch(err => next(err));
  });

  router.post('/', (req, res, next) => {
    let entity = Object.assign({
      createdAt: r.now()
    }, req.body);

    r
      .table(entityName)
      .insert(entity, { returnChanges: true })
      .run()
      .then(result => {
        if (result.errors > 0) {
          throw new Error(result.first_error);
        }

        res.status(201).json(result.changes[0].new_val);
        next();
      })
      .catch(err => next(err));
  });

  return router;
};
