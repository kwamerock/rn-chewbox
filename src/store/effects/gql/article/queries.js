import gql from 'graphql-tag';
import { articleFragment } from './fragments';

export const articles = gql`
  query articles($where: ArticleWhereInput, $orderBy: ArticleOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    articles(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${articleFragment}
  }
`;
