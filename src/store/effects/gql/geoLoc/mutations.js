import gql from 'graphql-tag';
import { geoLocFragment } from './fragments';

export const saveGeoLoc = gql`
  mutation saveGeoLoc($data: GeoLocUpdateInput!, $where: GeoLocWhereUniqueInput) {
    saveGeoLoc(data: $data, where: $where) ${geoLocFragment}
  }
`;

export const deleteGeoLoc = gql`
  mutation deleteGeoLoc($where: GeoLocWhereUniqueInput) {
    deleteGeoLoc(where: $where) ${geoLocFragment}
  }
`;
