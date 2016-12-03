import {nullParser} from './cli/utils/parsers';

let logsFolder = (() => {
  let folder = './logs/';
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
    folder = './test_logs/'
  }
  if (process.env.PARSE_SERVER_LOGS_FOLDER) {
    folder = nullParser(process.env.PARSE_SERVER_LOGS_FOLDER);
  }
  return folder;
})();

let { verbose, level } = (() => {
  let verbose = process.env.VERBOSE ? true : false;
  return { verbose, level: verbose ? 'verbose' : undefined }
})();

export default {
  DefaultMongoURI: 'mongodb://heroku_2clxhs4l:1tna8oalm0lk7befhdvhi73psn@ds019816.mlab.com:19816/heroku_2clxhs4l',
  jsonLogs: process.env.JSON_LOGS || false,
  logsFolder,
  verbose,
  level,
  silent: false,
  enableAnonymousUsers: true,
  allowClientClassCreation: true,
  maxUploadSize: '20mb',
  verifyUserEmails: false,
  preventLoginWithUnverifiedEmail: false,
  sessionLength: 31536000,
  expireInactiveSessions: true,
  revokeSessionOnPasswordReset: true,
  schemaCacheTTL: 5000, // in ms
  userSensitiveFields: ['email']
}
