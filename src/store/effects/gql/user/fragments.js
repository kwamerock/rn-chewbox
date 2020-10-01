import gql from 'graphql-tag';

/*
*
*/
export const userFragment = gql`{
  id
  balance
  bio
  appVersion
  needToUpgrade
  timezoneOffset
  chatId
  playerId
  timezone
  lunchtime
  firstName
  firstNameLower
  middleName
  middleNameLower
  lastName
  lastNameLower
  fullName
  fullNameLower
  dateOfBirth
  email
  avatar
  braintreeCustomerId
  createdAt
  updatedAt
  site { id }
  paymentMethods { id }
  groups { id name }
}`;

/*
*
*/
export const AuthPayLoad = gql`
{
  token
  user${userFragment}
  verificationCode
}
`;