import gql from 'graphql-tag';
import { pricingFragment } from './fragments';

export const savePricing = gql`
  mutation savePricing($data: PricingUpdateInput!, $where: PricingWhereUniqueInput) {
    savePricing(data: $data, where: $where) ${pricingFragment}
  }
`;

export const deletePricing = gql`
  mutation deletePricing($where: PricingWhereUniqueInput) {
    deletePricing(where: $where) ${pricingFragment}
  }
`;
