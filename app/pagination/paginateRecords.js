import buildResponse from './buildResponse';
import { PAGINATION_DEFAULT_LIMIT } from './constants';

const paginateRecords = async ({
  offset = 0,
  limit = PAGINATION_DEFAULT_LIMIT,
  query,
  pathFragment,
  projectId,
}) => {
  const queryClone = query.clone();
  const results = await queryClone
    .orderBy('createdAt', 'DESC')
    .limit(limit)
    .offset(offset);

  const overallResultsCount = await query.resultSize();

  const pagination = buildResponse({
    offset,
    limit,
    overallResultsCount,
    pathFragment,
    projectId,
  });

  return { pagination, results };
};

export default paginateRecords;
