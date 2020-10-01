import gql from 'graphql-tag';
import { batchSizeFragment } from './fragments';

export const saveBatchSize = gql`
  mutation saveBatchSize($data: BatchSizeUpdateInput!, $where: BatchSizeWhereUniqueInput) {
    saveBatchSize(data: $data, where: $where) ${batchSizeFragment}
  }
`;

export const deleteBatchSize = gql`
  mutation deleteBatchSize($where: BatchSizeWhereUniqueInput) {
    deleteBatchSize(where: $where) ${batchSizeFragment}
  }
`;
