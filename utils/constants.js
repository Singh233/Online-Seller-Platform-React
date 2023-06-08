import env from "./env";

const API_ROOT = env.API_URL;

// doc url - https://www.notion.so/aakashcn/Codeial-API-docs-3a4d0b5a42c54f0a94d951a42aabc13f
export const API_URLS = {
  login: () => `${API_ROOT}/sellers/sign-in`, //
  signup: () => `${API_ROOT}/sellers/sign-up`, //
  signout: () => `${API_ROOT}/sellers/sign-out`, //

  createCategory: () => `${API_ROOT}/category/create-category`,
  createSubcategory: () => `${API_ROOT}/category/create-subcategory`,

  getProducts: (offset, limit) =>
    `${API_ROOT}/products/index?offset=${offset}&limit=${limit}`,
  createProduct: () => `${API_ROOT}/products/create`, //

  sellerProfile: (id) => `${API_ROOT}/sellers/profile/${id}`,

  searchUsers: (searchText) => `${API_ROOT}/sellers/search?search=${searchText}`,
};

export const LOCALSTORAGE_TOKEN_KEY = "__social_token__";
