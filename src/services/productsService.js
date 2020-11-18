import axios from 'axios'
import { products, combos, materials } from '@/arr/products'
import images from '@/arr/images'
import { formatDate } from '../utils/methods'

const RESOURCE_NAME = '/products'
const MATERIALS = "/materials"
const IMAGES = "/images"

export const search = (query, source) => {
  let strQuery = new URLSearchParams(query).toString();

  return new Promise((resolve, reject) => {
    return axios.get(`${RESOURCE_NAME}?${strQuery}`, {
      cancelToken: source.token
    })
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export const add = (object) => {
  return new Promise((resolve, reject) => {
    return axios.post(RESOURCE_NAME, object)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const edit = (id, object) => {
  return new Promise((resolve, reject) => {
    return axios.put(`${RESOURCE_NAME}/${id}`, object)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const get = (id, source) => {
  return new Promise((resolve, reject) => {
    return axios.get(`${RESOURCE_NAME}/${id}`, {
      cancelToken: source.token
    })
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export const getImages = (id, source) => {
  return new Promise((resolve, reject) => {
    return axios.get(`${RESOURCE_NAME}/${id}${IMAGES}`, {
      cancelToken: source.token
    })
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export const deleteImage = (id, idImage) => {
  return new Promise((resolve, reject) => {
    return axios.delete(`${RESOURCE_NAME}/${id}${IMAGES}/${idImage}`)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export const addImage = (id, file) => {
  let formData = new FormData();
  formData.append("image", file);

  return new Promise((resolve, reject) => {
    return axios.post(`${RESOURCE_NAME}/${id}${IMAGES}`, formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export const getCombos = (id, source) => {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve({ data: combos })
    }, 2500);

    // axios.get(RESOURCE_NAME + query, {
    //   cancelToken: source.token
    // })
  })
}

export const addMaterial = (id, object) => {
  return new Promise((resolve, reject) => {
    return axios.post(`${RESOURCE_NAME}/${id}${MATERIALS}`, object)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export const getMaterials = (id, source) => {
  return new Promise((resolve, reject) => {
    return axios.get(`${RESOURCE_NAME}/${id}${MATERIALS}`, {
      cancelToken: source.token
    })
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const deleteMaterial = (id, idMaterial) => {
  return new Promise((resolve, reject) => {
    return axios.delete(`${RESOURCE_NAME}/${id}${MATERIALS}/${idMaterial}`)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export const editMaterial = (id, idMaterial, object) => {
  return new Promise((resolve, reject) => {
    return axios.put(`${RESOURCE_NAME}/${id}${MATERIALS}/${idMaterial}`, object)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export default {
  search,
  add,
  edit,
  get,
  getImages,
  deleteImage,
  addImage,
  getCombos,
  addMaterial,
  getMaterials,
  deleteMaterial,
  editMaterial
}