import gql from 'graphql-tag';
import { geoLocFragment } from './fragments';

export const geoLocs = gql`
  query geoLocs($where: GeoLocWhereInput, $orderBy: GeoLocOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    geoLocs(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) ${geoLocFragment}
  }
`;
