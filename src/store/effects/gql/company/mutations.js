import gql from 'graphql-tag';
import { companyFragment } from './fragments';

export const saveCompany = gql`
  mutation saveCompany($data: CompanyUpdateInput!, $where: CompanyWhereUniqueInput) {
    saveCompany(data: $data, where: $where) ${companyFragment}
  }
`;

export const deleteCompany = gql`
  mutation deleteCompany($where: CompanyWhereUniqueInput) {
    deleteCompany(where: $where) ${companyFragment}
  }
`;
