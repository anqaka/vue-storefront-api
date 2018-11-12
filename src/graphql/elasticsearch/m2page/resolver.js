import config from 'config';
import client from '../client';
import { buildQuery } from '../queryBuilder';
import { getIndexName } from '../mapping'

async function list(search, filter, context, rootValue) {
  let query = buildQuery({ search, filter, type: 'm2page' });

  const response = await client.search({
    index: getIndexName(context.req.url),
    type: config.elasticsearch.indexTypes[7],
    body: query
  });

  return response;
}

const resolver = {
  Query: {
    m2page: (_, { search, filter }, context, rootValue) =>
      list(search, filter, context, rootValue)
  }
};

export default resolver;
