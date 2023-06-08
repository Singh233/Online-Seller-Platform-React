/**
 * Define the action types
 */

// User actions
export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";

// Store actions
export const SET_STORE = "SET_STORE";
export const CLEAR_STORE = "CLEAR_STORE";

// Category actions
export const ADD_CATEGORY = "ADD_CATEGORY";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";

// Subcategory actions
export const ADD_SUBCATEGORY = "ADD_SUBCATEGORY";
export const REMOVE_SUBCATEGORY = "REMOVE_SUBCATEGORY";

// Inventory actions
export const ADD_INVENTORY_ITEM = "ADD_INVENTORY_ITEM";
export const REMOVE_INVENTORY_ITEM = "REMOVE_INVENTORY_ITEM";

// Search actions
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";


/**
 * Define the action creators
 */

// User actions
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

// Store actions
export const setStore = (store) => ({
  type: SET_STORE,
  payload: store,
});

export const clearStore = () => ({
  type: CLEAR_STORE,
});

// Category actions
export const addCategory = (category) => ({
  type: ADD_CATEGORY,
  payload: category,
});

export const removeCategory = (categoryId) => ({
  type: REMOVE_CATEGORY,
  payload: categoryId,
});

// Subcategory actions
export const addSubcategory = (subcategory) => ({
  type: ADD_SUBCATEGORY,
  payload: subcategory,
});

export const removeSubcategory = (subcategoryId) => ({
  type: REMOVE_SUBCATEGORY,
  payload: subcategoryId,
});

// Inventory actions
export const addInventoryItem = (item) => ({
  type: ADD_INVENTORY_ITEM,
  payload: item,
});

export const removeInventoryItem = (itemId) => ({
  type: REMOVE_INVENTORY_ITEM,
  payload: itemId,
});

// Search actions
export const setSearchResults = (results) => ({
  type: SET_SEARCH_RESULTS,
  payload: results,
});

export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS,
});
