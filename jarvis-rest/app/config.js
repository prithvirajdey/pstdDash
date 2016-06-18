module.exports = {
  rethinkdb: {
    host: 'rethink-db-1.centralus.cloudapp.azure.com',
    port: 28015,
    authKey: '',
    db: 'bootstrpp'
  },
  express: {
    port: process.env.port || 3000
  }
};
