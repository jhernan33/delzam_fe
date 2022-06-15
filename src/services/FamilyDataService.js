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
    return http.post("/familia/create/", data);
  }

  update(id, data) {
    return http.put(`/familia/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/familia/delete/${id}`);
  }

  findByFamily(search) {
    if(search.length>0){
      return http.get(`/familia/?search=${search}&page_size=15`);
    }
    return http.get(`/familia/`);
  }

  dropdown(){
    return http.get("/familia/combo/");
  }
}

export default new FamilyDataService();