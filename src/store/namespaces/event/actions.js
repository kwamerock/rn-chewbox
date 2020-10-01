import { isNil, isEmpty, get, defaultTo, assignIn, keyBy } from 'lodash';
import moment from 'moment';
import { string, object, array, date, mixed, number } from 'yup';

/*
*
*/
const errorMessage = (key, message) => {
	return (params) => {
		return { [key]: message }
	}
}

/*
*
*/
const _3daysLater = () => {
	return moment()
		.hour(0)
		.minute(0)
		.second(0)
		.add(3, 'days')
		.toDate()
}

/*
*
*/
const eventValidationSchema = object().shape({
	name: string().required(errorMessage('name', 'EVENT NAME IS REQUIRED')),
	description: string().required(errorMessage('description', 'DESCRIPTION IS REQUIRED')),
	deliveryDate: date()
		.required(errorMessage('deliveryDate', 'DELIVERY DATE IS REQUIRED'))
		.typeError(errorMessage('deliveryDate', 'DELIVERY DATE IS REQUIRED'))
		.min(_3daysLater(), errorMessage('deliveryDate', 'CHOOSE A DATE AT LEAST 3 DAYS FROM TODAY')),
	site: object().shape({
		name: string().required(errorMessage('site', 'DELIVERY LOCATION IS REQUIRED'))
	}),
	paymentSettingIndex: number(),
	attendies: array().required(errorMessage('attendies', 'SELECT ATTENDEES')),
	maxSpend: mixed().notRequired().when('paymentSettingIndex', {
		is: 0,
		then: number().required(errorMessage('maxSpend', 'MAX SPEND IS REQUIRED')).typeError(errorMessage('maxSpend', 'INVALID MAX SPEND')),
	})
})

/*
*
*/
export const getTotalEvents = async ({ state, effects }) => {
  const { events } = await effects.gql.queries.events()

  state.event.totalRecords = events ? events.length : 0
}

/*
*
*/
export const getEvents = async ({ state, effects }, data) => {
  let options = {}
  if (data && data.options) options = data.options
  else if (data && data.all) options = {}
  else {
    options = {
      first: state.event.eventPerPage,
      skip: (state.event.activePage - 1) * state.event.eventPerPage
    }
  }
  //
  const { events } = await effects.gql.queries.events(options)
  if (data && data.getValues) return events
  else state.event.events = keyBy(events, 'id')
}

/*
*
*/
export const saveEvent = async ({ effects }, data) => {
  // Validate
  console.log("====>Create Event");

  const object = { name, description, deliveryDate, site, attendies, maxSpend, paymentSettingIndex };
  eventValidationSchema.validate(object, { abortEarly: false })
    .then(() => {
      console.log("====>Success")
      try {
        // Call create event
        create(name, description, deliveryDate, site, PaymentSetting.all[paymentSettingIndex].value, attendies, maxSpend)
      } catch (exception) {
        console.log(tag, exception)
      }

    })
    .catch(err => {
      console.log("====>Failed")
      console.log(tag, 'error => ', err)
      const errors = assignIn({}, ...err.errors)

      console.log(tag, 'validate', errors)
      // flat map errors
      setErrors(errors)
    })
      
  return await effects.gql.mutations.saveEvent(data)
}

/*
*
*/
export const onChangePage = async ({ state }, page) => {
  state.event.activePage = page
}

/*
*
*/
export const onEventAdded = ({ state }, data) => {
  state.event.events.push(data)
}
