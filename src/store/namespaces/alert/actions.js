import { _ } from 'lodash';

/*
*
*/
export const show = async ({ state }, { type, message, title }) => {
  state.alert.type = type;
  state.alert.message = message;
  state.alert.title = title ?? 'Chune';
  state.alert.visible = true;
}

/*
*
*/
export const hide = async ({ state, effects }) => {
  state.alert.visible = false;
}

/*
*
*/
export const showError = async ({ actions }, { message, title }) => {
  actions.alert.show('error', message, title);
}

/*
*
*/
export const showInfo = async ({ actions }, { message, title }) => {
  actions.alert.show('info', message, title);
}

/*
*
*/
export const showWarn = async ({ actions }, { message, title }) => {
  actions.alert.show('warn', message, title);
}

/*
*
*/
export const showSuccess = async ({ actions }, { message, title }) => {
  actions.alert.show('success', message, title);
}

