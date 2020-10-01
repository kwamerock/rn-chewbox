import { _ } from 'lodash';

/*
*
*/
export const togglePlaying = async ({ state, effects }, data) => {
  state.player.isPlaying = !state.player.isPlaying;
}

/*
*
*/
export const setPlaying = async ({ state }, data) => {
  state.player.isPlaying = data;
}

/*
*
*/
export const goPrevious = async ({ state, actions }) => {
  // TODO check if first
  // return (state.player.playlist && state.player.playlist.length > 0 && 0 === state.player.playerIndex);
  actions.player.setPlayerIndex(state.player.playerIndex - 1);
}

/*
*
*/
export const goNext = async ({ state, actions }) => {  
  // TODO check if last
  // return (state.player.playlist && state.player.playlist.length > 0 && state.player.playlist.length === state.player.playerIndex + 1);
  actions.player.setPlayerIndex(state.player.playerIndex + 1);
  console.log(state.player.playerIndex, 'next index...')
}

/*
*
*/
export const setPlayerIndex = async ({ state }, index) => {
  console.log('setPlayerIndex', index)
  state.player.playerIndex = index;
  // state.player.currentlyPlaying = state.player.playlist[index];
}

/*
*
*/
export const setPlayerPlaylist = ({ state }, playlist) => {
  console.log('setting playlist...');
  state.player.playlist = playlist;
}

/*
*
*/
export const startPlaying = ({ state }, data) => {
  state.player.isPlaying = data.isPlaying;
  state.player.currentlyPlaying = data.currentVideo;
}
