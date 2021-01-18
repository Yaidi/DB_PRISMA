import querystring from 'querystring';
import nconf from 'nconf';

const getPublicUrl = ({ pathFragment, queryParams }) => {
  const host = nconf.get('BASE_URL') || 'localhost';
  const stringQueryParams = querystring.stringify(queryParams);

  const url = `${host}/${pathFragment}?${stringQueryParams}`;

  return url;
};

export default getPublicUrl;
