import 'db/init';

import paginateRecords from '../paginateRecords';

describe.skip('Pagination paginateRecords', () => {
  describe('when next results count less than total results', () => {
    it('returns pagination with nextUrl and results', async () => {
      const limit = 2;
      const offset = 0;
      await createThreeDatabaseItems();
      const query = getDatabaseItemsQuery();

      const actual = await paginateRecords({
        offset,
        limit,
        query,
        pathFragment: 'pets',
        projectId: '00000000',
      });

      expect(actual.pagination).toEqual({
        limit,
        offset,
        totalResults: 3,
        nextUrl: 'https://localhost/pets?limit=2&offset=2',
      });
      expect(actual.results.length).toEqual(2);
    });
  });

  describe('when on final page', () => {
    it('returns pagination with results and without nextUrl', async () => {
      const limit = 2;
      const offset = 2;
      await createThreeDatabaseItems();
      const query = getDatabaseItemsQuery();

      const actual = await paginateRecords({
        offset,
        limit,
        query,
        projectId: '00000000',
      });

      expect(actual.pagination).toEqual({ limit, offset, totalResults: 3 });
      expect(actual.results.length).toEqual(1);
    });
  });
});

const getDatabaseItemsQuery = () => {
  return Report.query();
};

const createThreeDatabaseItems = async () => {
  await createDatabaseItem();
  await createDatabaseItem();
  await createDatabaseItem();
};

const createDatabaseItem = async () => {
  const data = {
    projectId: '44ea2344-f17c-4e7a-b746-f01434f03de5',
    service: 'example',
    template: 'helloWorld',
    format: 'pdf',
    locale: 'en',
    title: 'Example report',
    createdBy: 'oxygenId',
  };
};
