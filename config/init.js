import nconf from 'nconf';

nconf.env().file({ file: '.env.json' });

nconf.defaults({
  // Set env vars here
});
