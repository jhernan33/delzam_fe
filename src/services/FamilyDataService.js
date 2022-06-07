import http from "../http-common";

class FamilyDataService {

  getAll(page,itemsPerPage) {
    if(page !== 'undefined' || page !=='null'){
      return http.get("/familia?page_size="+itemsPerPage+"&page="+page);
    }else{
      return http.get("/familia");
    }
  }

  get(id) {
    return http.get(`/familia/${id}`);
  }

  create(data) {
    return http.post("/familia", data);
  }

  update(id, data) {
    return http.put(`/familia/${id}`, data);
  }

  delete(id) {
    return http.delete(`/familia/${id}`);
  }


  findByTitle(title) {
    return http.get(`/familia/filter?valor=${title}`);
  }
}

export default new FamilyDataService();