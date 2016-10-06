import * as types from '../constants/ActionTypes';

export const createFile = (id, name, folderId) => (
  {type: types.CREATE_FILE, payload: {id, name, folderId}}
);
export const deleteFile = id => ({type: types.DELETE_FILE, payload: {id}});
export const renameFile = (id, newName) => ({type: types.RENAME_FILE, payload: {id, newName}});
export const addNewNode = (type, folderId) => ({type: types.ADD_NEW_NODE, payload: {type, folderId}});
export const selectNode = id => ({type: types.SELECT_NODE, payload: {id}});
export const selectTab = id => ({type: types.SELECT_TAB, payload: {id}});
export const closeTab = id => ({type: types.CLOSE_TAB, payload: {id}});
export const moveCursor = (line, col) => ({type: types.MOVE_CURSOR, payload: {line, col}});
