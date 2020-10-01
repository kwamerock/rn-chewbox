import React from 'react';
import { Braintree } from '@/views/Components/braintree';
import { string, object, number, date } from 'yup';
import { isEmpty, get, defaultTo, isNil, assignIn, keyBy } from 'lodash';

// Just return the function
const errorMessage = (key, message) => {
  return (params) => {
    return { [key] : message}
  }
}

const userValidationSchema = object().shape({
  firstName: string().required(errorMessage('firstName', 'FIRSTNAME IS REQUIRED')),
  lastName: string().required(errorMessage('lastName', 'LASTNAME IS REQUIRED')),
  email: string().email(errorMessage('email', 'INVALID EMAIL ADDRESS')).required(errorMessage('email','EMAIL IS REQRUIED')),
  siteName: string().required(errorMessage('site', 'DELIVERY LOCATION IS REQUIRED')),
});

/*
*
*/
export const getTotalUsers = async ({ state, effects }) => {
  const { users } = await effects.gql.queries.users();

  state.user.totalRecords = users ? users.length : 0;
}

/*
*
*/
export const getUsers = async ({ state, effects }, data) => {
  let options = {}
  if (data && data.options) options = data.options
  else if (data && data.all) options = {}
  else {
    options = {
      first: state.user.userPerPage,
      skip: (state.user.activePage - 1) * state.user.userPerPage
    }
  }
  //
  const { users } = await effects.gql.queries.users(options)
  if (data && data.getValues) return users
  else state.user.users = keyBy(users, 'id')
}

/*
*
*/
export const saveUser = async ({ effects }, variables) => {
  // useLoadingHud(state.user.isLoading);

  try {
    // Validate
    await userValidationSchema.validate(variables, {abortEarly: false});
    
    console.log(tag, 'validate', variables)

    // Delete temporary site name
    delete variables.siteName;

    const { avatar, employer } = variables;

    if (avatar.base64) {
      Object.assign(variables, {
        avatar: avatar.base64,
        avatarType: avatar.contentType,
      })
    }

    // Add some location props
    // Check if from google places selector
    const placeId = get(employer, 'details.place_id');
    const coords = get(employer, 'details.coords');

    if (employer.id) { // when site is picker
      variables.site = {id: employer.id};

    } else if (!isNil(placeId)) { // if has google place id
      variables.googlePlacesId = placeId;

    } else if (!isNil(coords)) { // When selected from current location
      variables.gps = { lat: employer.details.coords.latitude, lon:employer.details.coords.longitude };
    }

    // set timezone offset and timezone
    variables.timezoneOffset = (new Date()).getTimezoneOffset();
    variables.timezone = RNLocalize.getTimeZone();

    console.log(tag, 'actual parameters to be sent', variables);

    // Just delete the site name.
    // Call update api
    console.log(variables, 'save user variables')
    return await effects.gql.mutations.saveUser(variables);

  } catch(e) {
    const errors = assignIn({}, ...e.errors);
    console.log(tag, 'validate', errors);
    
    setValidationErrors(errors); // flat map errors
  }
}

/*
*
*/
export const onChangePage = async ({ state }, page) => {
  state.user.activePage = page
}

/*
*
*/
export const onUserAdded = ({ state }, data) => {
  state.user.push(data)
}
  
/**
 * Use Add Payment Hook
 * @return {[type]} [description]
 */
export const addUserBraintreePayment = async ({ state, actions }, addPaymentHandler) => {
  // const { currentUser } = state;
  // // Temp variable to store fetched payment method
  // const paymentMethodRef = React.useRef(null);

  // const onUserUpdateHandler = React.useCallback(
  //   ( { data, error } ) => {
  //     if ( data ) {
  //       // return the added payment method correctly
  //       const c = paymentMethodRef.current  // From client

  //       // Find the same token
  //       const added = currentUser.paymentMethods.find(p => p.token === c.token)

  //       addPaymentHandler({ data: paymentMethodRef.current, added})    // From Server added

  //     } else {
  //       console.log('useAddPayment() - Error occured:', error)
  //       addPaymentHandler({error})
  //     }
  //     // Clear after the handler is called.
  //     paymentMethodRef.current = null;
  //   },
  //   []
  // )

  // const [ update ] = actions.user.saveUser(onUserUpdateHandler);

  // const onHandler = React.useCallback(
  //   async ({ data:token, error }) => {
  //     paymentMethodRef.current = null;

  //     if (!token) {
  //       addPaymentHandler({ error })
  //       console.log('useAddPayment() : Generate BrainTree Token Failed', error)
  //       return;
  //     }
  //     try {
  //       const res = await Braintree.showDropIn(token);

  //       if (!res || !res.paymentOptionType){
  //         console.log('useAddPayment() : Failed to add braintree.')
  //         addPaymentHandler({ error: new Error('useAddPayment() : Failed to add braintree.') })
  //         return
  //       }

  //       const paymentMethod = {
  //         type: 'payment',
  //         cardType: Braintree.getOptionType(res.paymentOptionType),
  //         last4: res.paymentDescription,
  //         token: res.paymentNonce,
  //         isValid: true,
  //         isDefault: true
  //       }

  //       console.log('useAddPayment() : braintree response - ', res)
  //       paymentMethodRef.current = paymentMethod;
  //       // Call update user mutation
  //       update( { paymentMethod, userId: currentUser.id })

  //     } catch(error) {
  //       addPaymentHandler({ error })
  //       console.log('useAddPayment() : Braintree ShowDropIn Failed', error)
  //     }
  //   },
  //   [update, currentUser.id]        // Depend on update handler of update user.
  // )

  // const [ getToken ] = await actions.paymentMethod.generateBraintreeToken();
  // console.log(getToken, 'getToken')
  // return getToken
}