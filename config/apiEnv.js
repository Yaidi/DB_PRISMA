import nconf from 'nconf';

const getApiEnv = () => {
  return nconf.get('COS_DEPLOYMENT_ENV') || nconf.get('ENVIRONMENT');
};

export default getApiEnv;
