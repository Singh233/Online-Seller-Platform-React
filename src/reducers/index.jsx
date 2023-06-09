import { combineReducers } from "redux";

// actions
import {
  SET_USER,
  CLEAR_USER,
  SET_STORE,
  CLEAR_STORE,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  ADD_SUBCATEGORY,
  REMOVE_SUBCATEGORY,
  ADD_INVENTORY_ITEM,
  REMOVE_INVENTORY_ITEM,
  SET_SEARCH_RESULTS,
  CLEAR_SEARCH_RESULTS,
  SET_CATEGORY,
  SET_PRODUCTS,
  SET_SUBCATEGORY,
} from "../actions";

// User reducer initial state
const initialUserState = {
  email: "",
  businessName: "",
};

// Store reducer initial state
const initialStoreState = {
  seller: "",
  address: "",
  gst: "",
  logo: "",
  storeTimings: "",
};

// Category reducer initial state
const initialCategoriesState = {
  categories: [],
};

// Subcategory reducer initial state
const initialSubcategoriesState = {
  subCategories: [],
};

// Inventory reducer initial state
const initialInventoryState = {
  products: [],
  loading: false,
};

// Search reducer initial state
const initialSearchState = {
  result: {},
  showSearchResults: false,
};
// User reducer
const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case CLEAR_USER:
      return initialUserState;
    default:
      return state;
  }
};

// Store reducer
const storeReducer = (state = initialStoreState, action) => {
  switch (action.type) {
    case SET_STORE:
      return action.payload;
    case CLEAR_STORE:
      return initialStoreState;
    default:
      return state;
  }
};

// Category reducer
const categoriesReducer = (state = initialCategoriesState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return [...state, action.payload];
    case SET_CATEGORY:
      return action.payload;
    case REMOVE_CATEGORY:
      return state.filter((category) => category.id !== action.payload);
    default:
      return state;
  }
};

// Subcategory reducer
const subcategoriesReducer = (state = initialSubcategoriesState, action) => {
  switch (action.type) {
    case ADD_SUBCATEGORY:
      return [...state, action.payload];
    case SET_SUBCATEGORY:
      return action.payload;
    case REMOVE_SUBCATEGORY:
      return state.filter((subcategory) => subcategory.id !== action.payload);
    default:
      return state;
  }
};

// Inventory reducer
const inventoryReducer = (state = initialInventoryState, action) => {
  switch (action.type) {
    case ADD_INVENTORY_ITEM:
      return [...state, action.payload];
    case SET_PRODUCTS:
      return action.payload;
    case REMOVE_INVENTORY_ITEM:
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

// Search reducer
const searchReducer = (state = initialSearchState, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return action.payload;
    case CLEAR_SEARCH_RESULTS:
      return initialSearchState;
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  store: storeReducer,
  categories: categoriesReducer,
  subcategories: subcategoriesReducer,
  inventory: inventoryReducer,
  searchResults: searchReducer,
});

export default rootReducer;
