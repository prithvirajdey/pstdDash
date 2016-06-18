module.exports = {
  rethinkdb: {
    db: 'test',
    host: 'rethink-db-proxy.centralus.cloudapp.azure.com',
    port: 28015
  },
  express: {
    port: process.env.port || 3000
  }
};
