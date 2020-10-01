import gql from 'graphql-tag';
import { articleCategoryFragment } from './fragments';

export const saveArticleCategory = gql`
  mutation saveArticleCategory($data: ArticleCategoryUpdateInput!, $where: ArticleCategoryWhereUniqueInput) {
    saveArticleCategory(data: $data, where: $where) ${articleCategoryFragment}
  }
`;

export const deleteArticleCategory = gql`
  mutation deleteArticleCategory($where: ArticleCategoryWhereUniqueInput) {
    deleteArticleCategory(where: $where) ${articleCategoryFragment}
  }
`;
