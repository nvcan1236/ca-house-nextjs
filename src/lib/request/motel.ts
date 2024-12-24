import http from "../http"

const motelApiRequest = {
  getAll: (params:string) => http.get(`/motel?${params}`),
  getNearest: (params:string) => http.get(`/motel/nearest?${params}`),
  getById: (id:string) => http.get(`/motel/${id}`),
  getByOwner: (ownerId:string) => http.get(`/motel/owner/${ownerId}`),
  stat: (params:string) => http.get(`/motel/stat?${params}`),
  create: (body:string) => http.post(`/motel`, body),
  update: (id:string,body:string) => http.put(`/motel/${id}`, body),
  approve:(id:string) => http.put(`/motel/${id}/approve`),

  // TODO: add some apis for detail information
}

export default motelApiRequest