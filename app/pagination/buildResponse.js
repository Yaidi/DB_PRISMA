import { getPublicUrl } from 'app/shared';

const buildResponse = ({
  limit,
  offset,
  overallResultsCount,
  pathFragment,
  projectId,
}) => {
  const nextOffset = offset + limit;
  const hasMoreToFetch = nextOffset < overallResultsCount;
  const queryParams = { limit, offset: nextOffset };
  const nextUrl = getPublicUrl({ projectId, pathFragment, queryParams });

  return {
    limit,
    offset,
    totalResults: overallResultsCount,
    ...(hasMoreToFetch && { nextUrl }),
  };
};

export default buildResponse;
