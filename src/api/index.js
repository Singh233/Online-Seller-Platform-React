import { json } from "react-router-dom";
import { API_URLS, getFormBody, LOCALSTORAGE_TOKEN_KEY } from "../utils";

const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  const headers = {
    "content-type": "application/x-www-form-urlencoded",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body && body.formData) {
    // config.body = getFormBody(body);
    config.body = body;
  } else if (body) {
    config.body = getFormBody(body);
  }

  try {
    // console.log('config', config)
    const response = await fetch(url, config);
    const data = await response.json();

    if (data.success) {
      // console.log(data.data);
      return {
        data: data.data,
        success: true,
      };
    }
    throw new Error(data.message);
  } catch (error) {
    return {
      message: error.message,
      success: false,
    };
  }
};

export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: "POST",
    body: { email, password },
  });
};

export const signUp = (email, businessName, password, confirmPassword) => {
  return customFetch(API_URLS.signup(), {
    method: "POST",
    body: { businessName, email, password, confirmPassword },
  });
};

export const createCategory = (name) => {
  return customFetch(API_URLS.createCategory(), {
    method: "POST",
    body: { name },
  });
};

export const createSubcategory = (name, categoryId) => {
  return customFetch(API_URLS.createSubcategory(), {
    method: "POST",
    body: { name, categoryId },
  });
};

export const getSellerProfile = (id) => {
  return customFetch(API_URLS.sellerProfile(id), {
    method: "GET",
  });
};

export const addProduct = (sellerId, storeId, categoryId, subcategoryId, productName, MRP, SP, QTY, file) => {

  const formData = new FormData();
  formData.append("filepond", file[0]);
  formData.append("sellerId", sellerId);
  formData.append("storeId", storeId);
  formData.append("categoryId", categoryId);
  formData.append("subCategoryId", subcategoryId);
  formData.append("productName", productName);
  formData.append("MRP", MRP);
  formData.append("SP", SP);
  formData.append("quantity", QTY);


  return new Promise(function (resolve, reject) {
    // make an xmlhttprequest to the server
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        const data = JSON.parse(xhr.responseText);
        // console.log('data', data);
        resolve(data);
        return {
          data: data.data,
          success: true,
        };
      }
    };
    xhr.open("POST", API_URLS.createProduct());
    xhr.setRequestHeader(
      "Authorization",
      `Bearer ${window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)}`
    );
    xhr.send(formData);
  });
};

export const addStore = (address, gst, storeTimings, file) => {

  const formData = new FormData();
  formData.append("filepond", file[0]);
  formData.append("address", address);
  formData.append("gst", gst);
  formData.append("storeTimings", storeTimings);


  return new Promise(function (resolve, reject) {
    // make an xmlhttprequest to the server
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        const data = JSON.parse(xhr.responseText);
        // console.log('data', data);
        resolve(data);
        return {
          data: data.data,
          success: true,
        };
      }
    };
    xhr.open("POST", API_URLS.createStore());
    xhr.setRequestHeader(
      "Authorization",
      `Bearer ${window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)}`
    );
    xhr.send(formData);
  });
};
