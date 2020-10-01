import gql from 'graphql-tag';
import { articleFragment } from './fragments';

export const saveArticle = gql`
  mutation saveArticle($data: ArticleUpdateInput!, $where: ArticleWhereUniqueInput) {
    saveArticle(data: $data, where: $where) ${articleFragment}
  }
`;

export const deleteArticle = gql`
  mutation deleteArticle($where: ArticleWhereUniqueInput) {
    deleteArticle(where: $where) ${articleFragment}
  }
`;
