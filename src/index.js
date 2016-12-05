import ParseServer          from './ParseServer';
import S3Adapter            from 'parse-server-s3-adapter'
import FileSystemAdapter    from 'parse-server-fs-adapter'
import InMemoryCacheAdapter from './Adapters/Cache/InMemoryCacheAdapter'
import NullCacheAdapter     from './Adapters/Cache/NullCacheAdapter'
import RedisCacheAdapter    from './Adapters/Cache/RedisCacheAdapter'
import * as TestUtils       from './TestUtils';
import { useExternal }      from './deprecated';
import { getLogger }        from './logger';

// Factory function
let _ParseServer = function(options) {

  options["verifyUserEmails"] = true;
  options["publicServerURL"] = "http://www.awesomefat.com";
  options["emailVerifyTokenValidityDuration"] = 2 * 60 * 60;
  options["preventLoginWithUnverifiedEmail"] = false;
  options["appName"] = "Skwad";
  options["emailAdapter"] = {
    module: 'parse-server-simple-mailgun-adapter',
    options: {
               fromAddress: 'skwad@skwad.com',
               domain: 'sandbox11a3162a2f9f420cbb7a16050ece428e.mailgun.org',
               apiKey: 'key-d279ba46aac5d9e924d0334518dac5a6',
             }
  };
  console.log(options);
  let server = new ParseServer(options);
  return server.app;
}

// Mount the create liveQueryServer
_ParseServer.createLiveQueryServer = ParseServer.createLiveQueryServer;

let GCSAdapter = useExternal('GCSAdapter', 'parse-server-gcs-adapter');

Object.defineProperty(module.exports, 'logger', {
  get: getLogger
});

export default ParseServer;
export { S3Adapter, GCSAdapter, FileSystemAdapter, InMemoryCacheAdapter, NullCacheAdapter, RedisCacheAdapter, TestUtils, _ParseServer as ParseServer };
