import { fromJS } from 'immutable';
import { cloneDeep } from 'lodash';

import * as mainActions from '../actions/mainActions';
import * as repoService from '../services/repoService';


const initialState = fromJS({
	allItems: [],
	backup: [],
	cartItems: [],
	deletedItems: [],
	searchValue: '',
	edited: false,
});

function sortItems(state){
	state = state.updateIn(['allItems'], function (items) {
		return items.sort((a,b) => 
		
			a.category.title < b.category.title ? -1 :
				b.category.title < a.category.title ? 1 :
					a.name.toUpperCase() < b.name.toUpperCase() ? -1 :
						b.name.toUpperCase() < a.name.toUpperCase() ? 1 :
							a.id < b.id ? -1 :
								b.id < a.id ? 1 : 0
		);
	});
	return state;
}


function createItem(oldState, action){
	let state = oldState;
	state = state.updateIn(['allItems'], function (items) {
		items = items.push(action.item);
		return items;
	});
	if(action.edit){
		state = state.set('edited', true);
	}
	state = sortItems(state);
	return state;
}

function addItems(oldState, action){
	let state = oldState;
	state = state.updateIn(['allItems'], function (items) {
		items = items.concat(action.items);
		return items;
	});
	state = sortItems(state);
	state = state.set('backup', cloneDeep(state.get('allItems')));
	return state;
}

function deleteItem(oldState, action){
	let state = oldState;
	state = state.updateIn(['allItems'], function (items) {
		items = items.splice(items.indexOf(action.item), 1);
		return items;
	});
	state = state.updateIn(['deletedItems'], function (items) {
		items = items.push(action.item);
		return items;
	});
	state = state.set('edited', true);
	return state;
}

function changeItem(oldState, action){
	let state = oldState;
	state = state.updateIn(['allItems'], function (items) {
		let item = items.find(item => item.id == action.data.id);
		let oldItem = item;
		item.update(action.data);
		items = items.splice(items.indexOf(oldItem), 1, item);
		return items;
	});
	state = state.set('edited', true);
	return state;
}

function addItemToCart(oldState, action){
	let state = oldState;
	state = state.updateIn(['cartItems'], function (items) {
		items = items.push(action.item);
		return items;
	});
	return state;
}

function removeItemFromCart(oldState, action){
	let state = oldState;
	state = state.updateIn(['cartItems'], function (items) {
		items = items.splice(items.indexOf(action.item), 1);
		return items;
	});
	return state;
}

function toggleItemVisible(oldState, action){
	let state = oldState;
	state = state.updateIn(['allItems'], function(items) {
		action.item.visible = action.item.visible ? false : true;
		action.item.edited = true;
		items = items.splice(items.indexOf(action.item), 1, action.item);
		return items;
	});
	state = state.set('edited', true);
	return state;
}


function checkout(oldState, action){
	let state = oldState;
	state = state.updateIn(['cartItems'], function(items) {
		items.forEach(item => {
			items = items.splice(items.indexOf(item), 1);
		});
    
		return items;
	});
	return state;
}

function save(oldState, action){
	let state = oldState;
	
	state = state.updateIn(['allItems'], function(items) {
		items.forEach(item => {
			if(item.edited){
				item.edited = false;
				repoService.editItem(item);
			}
		});
		return items;
	});
	state = state.updateIn(['deletedItems'], function(items) {
		items.forEach(item => {
			repoService.removeItem(item);
		});
		return fromJS([]);
	});
	state = state.set('backup', cloneDeep(state.get('allItems')));
	state = state.set('edited', false);
	return state;
}

function cancelSave(oldState, action){
	let state = oldState;
	state = state.set('allItems', cloneDeep(state.get('backup')));
	state = state.set('deletedItems', fromJS([]));
	state = state.set('edited', false);  
	return state;
}


function searchCategory(oldState, action){
	let state = oldState;
	state  = state.set('searchValue', action.data);
	return state;
}



export function mainReducer(state = initialState, action) {
	switch (action.type) {
	case mainActions.actions.searchCategory:
		return searchCategory(state, action);
	case mainActions.actions.checkout:
		return checkout(state, action);
	case mainActions.actions.save:
		return save(state, action);
	case mainActions.actions.cancelSave:
		return cancelSave(state, action);

	case mainActions.actions.removeItemFromCart:
		return removeItemFromCart(state, action);
	case mainActions.actions.addItemToCart:
		return addItemToCart(state, action);
      
	case mainActions.actions.toggleItemVisible:
		return toggleItemVisible(state, action);
	case mainActions.actions.changeItem:
		return changeItem(state, action);
	case mainActions.actions.deleteItem:
		return deleteItem(state, action);
	case mainActions.actions.createItem:
		return createItem(state, action);
	case mainActions.actions.addItems:
		return addItems(state, action);

	default:
		return state;
	}
}