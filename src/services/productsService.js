import axios from 'axios'

const RESOURCE_NAME = '/products'
const MATERIALS = "/materials"
const IMAGES = "/images"
const COMBOS = "/combos"
const SCHEDULES = "/schedules"
const SALES = "/sale"

export const search = (query, source) => {
  return new Promise((resolve, reject) => {
    return axios.get(`${RESOURCE_NAME}`, {
      params: query,
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
  return new Promise((resolve, reject) => {
    return axios.get(`${RESOURCE_NAME}/${id}${COMBOS}`, {
      cancelToken: source.token
    })
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

export const getScheduleYears = (id, source) => {
  return new Promise((resolve, reject) => {
    return axios.get(`${RESOURCE_NAME}/${id}${SCHEDULES}/years`, {
      cancelToken: source.token
    })
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const getReportScheduleYear = (id, year, source, isFinish) => {
  return new Promise((resolve, reject) => {
    return axios.get(`${RESOURCE_NAME}/${id}${SCHEDULES}/report/${year}?isFinish=${isFinish}`, {
      cancelToken: source.token
    })
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const searchSchedules = (id, query, source) => {
  return new Promise((resolve, reject) => {
    return axios.get(`${RESOURCE_NAME}/${id}${SCHEDULES}`, {
      params: query,
      cancelToken: source.token
    })
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

export const searchSales = (id, query, source) => {
  return new Promise((resolve, reject) => {
    return axios.get(`${RESOURCE_NAME}/${id}${SALES}`, {
      params: query,
      cancelToken: source.token
    })
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