# Chat API

## Dependencies

- runs on node.js v10.16.3
- [express 4+](http://expressjs.com/)
- [eslint](http://eslint.org/)
- mysql
- POSTMAN

## Configuration

- Edit configuration in `config/default.json` and
- custom environment variables names in `config/custom-environment-variables.json`,
- Db configuration in config.json
  Following variables can be configured:

- `port` the port to listen
- `logLevel` the log level `debug` or `info`
- `version` the version of api
- `config.json use for db onfiguration`

## Local Deployment

- Please make sure to configure url of database rightly in `config/config.json` or use **host:0.0.0.0**.
- Install dependencies `npm i`
- run lint check `npm run lint`
- Start app `npm start`

## Verify API
```
newman run https://www.getpostman.com/collections/f9e111c9c501c63fa327
```