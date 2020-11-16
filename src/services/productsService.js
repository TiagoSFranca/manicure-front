import axios from 'axios'
import { products, combos, materials } from '@/arr/products'
import images from '@/arr/images'

const RESOURCE_NAME = '/Pets'

export const search = (query, source) => {
  console.log("TEST", new URLSearchParams(query).toString())

  return new Promise((resolve) => {
    setTimeout(function () {
      resolve({ data: products })
    }, 3000);

    // axios.get(RESOURCE_NAME + query, {
    //   cancelToken: source.token
    // })
  })
};

export const add = (object) => {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve(object)
    }, 3000);
  })
}

export const edit = (id, object) => {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve({ data: object })
    }, 3000);
  })
}

export const get = (id, source) => {
  return new Promise((resolve) => {
    setTimeout(function () {
      let product = products.filter(e => e.id === parseInt(id))
      resolve({ data: product.length > 0 ? product[0] : null })
    }, 3000);

    // axios.get(RESOURCE_NAME + query, {
    //   cancelToken: source.token
    // })
  })
};

export const getImages = (id, source) => {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve({ data: images.getImages() })
    }, 2500);

    // axios.get(RESOURCE_NAME + query, {
    //   cancelToken: source.token
    // })
  })
};

export const deleteImage = (id, idImage) => {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve()
    }, 2500);

    // axios.get(RESOURCE_NAME + query, {
    //   cancelToken: source.token
    // })
  })
};

export const addImage = (id, file) => {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve()
    }, 2500);

    // axios.get(RESOURCE_NAME + query, {
    //   cancelToken: source.token
    // })
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
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve()
    }, 2500);

    // axios.get(RESOURCE_NAME + query, {
    //   cancelToken: source.token
    // })
  })
};

export const getMaterials = (id, source) => {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve({ data: materials })
    }, 2000);

    // axios.get(RESOURCE_NAME + query, {
    //   cancelToken: source.token
    // })
  })
}

export const deleteMaterial = (id, idMaterial) => {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve()
    }, 2500);

    // axios.get(RESOURCE_NAME + query, {
    //   cancelToken: source.token
    // })
  })
};

export const editMaterial = (id, idMaterial, object) => {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve()
    }, 2500);

    // axios.get(RESOURCE_NAME + query, {
    //   cancelToken: source.token
    // })
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