import nock from 'nock';
import 'config/init';


nock.disableNetConnect();
nock.enableNetConnect(
  (host) => host.startsWith('127.0.0.1') || host.startsWith('pdfreactor'),
);

