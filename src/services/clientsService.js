import axios from 'axios'
import base from './baseHttp'

const RESOURCE_NAME = '/clients'
const SCHEDULES = "/schedules"

export const search = (query, requestKey) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}`, {
      params: query,
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

export default {
  search,
  add,
  edit,
  get,
  getScheduleYears,
  getReportScheduleYear,
  searchSchedules,
}