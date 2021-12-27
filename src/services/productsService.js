import axios from 'axios'
import base from './baseHttp'

const RESOURCE_NAME = '/products'
const MATERIALS = "/materials"
const IMAGES = "/images"
const COMBOS = "/combos"
const SCHEDULES = "/schedules"
const SALES = "/sale"

export const search = (query, requestKey) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}`, {
      params: query
    }, requestKey)
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

export const get = (id, requestKey) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}`, null, requestKey)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export const getImages = (id, requestKey) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}${IMAGES}`, null, requestKey)
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

export const getCombos = (id, requestKey) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}${COMBOS}`, null, requestKey)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const addMaterial = (id, object) => {
  return new Promise((resolve, reject) => {
    return axios.post(`${RESOURCE_NAME}/${id}${MATERIALS}`, object)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export const getMaterials = (id, requestKey) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}${MATERIALS}`, null, requestKey)
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

export const getScheduleYears = (id, requestKey) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}${SCHEDULES}/years`, null, requestKey)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const getReportScheduleYear = (id, year, isFinish, requestKey) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}${SCHEDULES}/report/${year}?isFinish=${isFinish}`,
      null, requestKey)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const searchSchedules = (id, query, requestKey) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}${SCHEDULES}`, {
      params: query,
    }, requestKey)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export const toggleActive = (id) => {
  return new Promise((resolve, reject) => {
    return axios.post(`${RESOURCE_NAME}/${id}/toggleActive`)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const changeSale = (id, object) => {
  return new Promise((resolve, reject) => {
    return axios.put(`${RESOURCE_NAME}/${id}${SALES}`, object)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const searchSales = (id, query, requestKey) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}${SALES}`, {
      params: query,
    }, requestKey)
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
  editMaterial,
  getScheduleYears,
  getReportScheduleYear,
  searchSchedules,
  toggleActive,
  changeSale,
  searchSales
}