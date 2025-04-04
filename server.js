const { createServer } = require('node:http');
const { join } = require('node:path');

const dotenv = require('dotenv');

const dotenvConfig = dotenv.config({ path: join(__dirname, './config.env') });
if (!!dotenvConfig.error) {
  console.error('[-] dotenv config', dotenvConfig.error.message);
  console.info('[i] process terminated.');

  process.exit(1);
}

const port = process.env.PORT;
const host = process.env.HOST;
const { app } = require('./app');

const server = createServer(app);

server.listen(port, host, () => {
  console.info(`[i] server is running on ${host}:${port} ...`);
});
