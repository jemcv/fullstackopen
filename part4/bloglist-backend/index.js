const app = require('./app') // Express app
const config = require('./utils/config') // Config file for MongoDB URI and Port
const logger = require('./utils/logger') // Logger file for logging

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})