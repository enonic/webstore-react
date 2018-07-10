import { fromJS } from 'immutable';
import * as mainActions from '../actions/mainActions'

const initialState = fromJS({
  allItems: [],
  cartItems: [],
  visibleItem: [],
  categories: [
    {
      title: "Category 1",
      action: "FILTER CATEGORY 1"
    },
    {
      title: "Category 2",
      action: "FILTER CATEGORY 2"
    }
  ],
  toaster : {
    visible : false,
    message : ""
  }
});

function createItem(oldState, action){
  let state = oldState
  state = state.updateIn(['allItems'], function (items) {
    items = items.push(action.item)
    return items
  });
  return state
}

function deleteItem(oldState, action){
  let state = oldState
  state = state.updateIn(['allItems'], function (items) {
    items = items.splice(items.indexOf(action.item), 1)
    return items
  });
  return state
}

function changeItem(oldState, action){
  let state = oldState
  return state
}

function addItemToCart(oldState, action){
  let state = oldState
  state = state.updateIn(['cartItems'], function (items) {
    items = items.push(action.item)
    return items
  });
  return state
}

function removeItemFromCart(oldState, action){
  let state = oldState
  state = state.updateIn(['cartItems'], function (items) {
    items = items.splice(items.indexOf(action.item), 1)
    return items
  });
  return state
}

function toggleVisible(oldState, action){
  let state = oldState
  state = state.updateIn(["allItems"], function(items) {
    action.item.visible = action.item.visible ? false : true;
    items = items.splice(items.indexOf(action.item), 1, action.item)
    return items;
  });
  return state
}

function addCategory(oldState, action){
  let state = oldState
  return state
}


function showToaster(oldState, action){
  let state = oldState
  state = state.updateIn(["toaster"], function(toaster) {
    toaster = toaster.set('visible', true)
    toaster = toaster.set('message', action.message)
    return toaster;
  });
  return state
}

function hideToaster(oldState, action){
  let state = oldState
  state = state.updateIn(["toaster"], function(toaster) {
    toaster = toaster.set('visible', false)
    toaster = toaster.set('message', "")
    return toaster;
  });
  return state
}


function checkout(oldState, action){
  let state = oldState
  state = state.updateIn(["cartItems"], function(items) {
    items.foreEach(item => {
      items = items.splice(items.indexOf(item), 1)
    })
    
    return items;
  });
  return state
}



export function mainReducer(state = initialState, action) {
  switch (action.type) {
    case mainActions.actions.checkout:
      return checkout(state, action)
    case mainActions.actions.hideToaster:
      return hideToaster(state, action)
    case mainActions.actions.showToaster:
      return showToaster(state, action)
    case mainActions.actions.toggleVisible:
      return toggleVisible(state, action)
    case mainActions.actions.removeItemFromCart:
      return removeItemFromCart(state, action)
    case mainActions.actions.addItemToCart:
      return addItemToCart(state, action)
    case mainActions.actions.changeItem:
      return changeItem(state, action)
    case mainActions.actions.deleteItem:
      return deleteItem(state, action)
    case mainActions.actions.createItem:
      return createItem(state, action)
    default:
      return state;
  }
}