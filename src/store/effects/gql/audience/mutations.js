import gql from 'graphql-tag';
import { audienceFragment } from './fragments';

export const saveAudience = gql`
  mutation saveAudience($data: AudienceUpdateInput!, $where: AudienceWhereUniqueInput) {
    saveAudience(data: $data, where: $where) ${audienceFragment}
  }
`;

export const deleteAudience = gql`
  mutation deleteAudience($where: AudienceWhereUniqueInput) {
    deleteAudience(where: $where) ${audienceFragment}
  }
`;
