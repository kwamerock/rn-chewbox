import gql from 'graphql-tag';
import { userFragment, AuthPayLoad } from './fragments';

/*
*
*/
export const saveUser = gql`
  mutation saveUser($data: UserUpdateInput!, $where: UserWhereUniqueInput) {
    saveUser(data: $data, where: $where) ${userFragment}
  }
`;

/*
*
*/
export const deleteUser = gql`
  mutation deleteUser($where: UserWhereUniqueInput) {
    deleteUser(where: $where) ${userFragment}
  }
`;

/*
*
*/
export const createAppUser = gql`
  mutation createAppUser($mobileNumber: String! $generateToken: Boolean $disableSendingSmsCode: Boolean) {
    createAppUser(generateToken: $generateToken mobileNumber: $mobileNumber disableSendingSmsCode: $disableSendingSmsCode) ${AuthPayLoad}
  }
`;

/*
*
*/
export const verifySmsCode = gql`
  mutation verifySmsCode($userId: String! $verifyCode: String! $mobileNumber: String! $device: Json) {
    verifySmsCode(userId: $userId verifyCode: $verifyCode mobileNumber: $mobileNumber device: $device) {
      user {
        id
      }
      token
    }
  }
`;

/*
*
*/
export const login = gql`
  mutation login($email:String! $password:String!) {
    login(email:$email password:$password) {
      token
      user ${userFragment}
    }
  }
`;

/*
*
*/
export const loginWithToken = gql`
  mutation loginWithToken($token:String! $userId:String! $appVersion:String) {
    loginWithToken(token:$token userId:$userId appVersion:$appVersion) {
      token
      user ${userFragment}
    }
  }
`;

/*
*
*/
export const triggerPasswordReset = gql`
  mutation triggerPasswordReset($email:String! $domain:String!) {
    triggerPasswordReset(email:$email domain:$domain)
  }
`;

/*
*
*/
export const passwordReset = gql`
  mutation passwordReset($email:String! $resetToken:String! $password:String!) {
    passwordReset(email:$email resetToken:$resetToken password:$password)
  }
`;