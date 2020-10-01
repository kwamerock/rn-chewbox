import gql from 'graphql-tag';
import { articleCategoryFragment } from './fragments';

export const articleCategories = gql`
  query articleCategories($where: ArticleCategoryWhereInput, $orderBy: ArticleCategoryOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    articleCategories(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${articleCategoryFragment}
  }
`;
