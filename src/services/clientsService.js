import axios from 'axios'

const RESOURCE_NAME = '/clients'
const SCHEDULES = "/schedules"

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

export default {
  search,
  add,
  edit,
  get,
  getScheduleYears,
  getReportScheduleYear,
  searchSchedules,
}