import http from "../http-common";

class SubFamiliaDataService {

  getAll(page,itemsPerPage) {
    if(page !== 'undefined' || page !=='null'){
      return http.get("/subfamilia?page_size="+itemsPerPage+"&page="+page);
    }else{
      return http.get("/subfamilia");
    }
  }

  get(id) {
    return http.get(`/subfamilia/${id}`);
  }

  create(data) {
    return http.post("/subfamilia/create/", data);
  }

  update(id, data) {
    return http.put(`/subfamilia/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/subfamilia/delete/${id}`);
  }


  findByFamily(search) {
    if(search.length>0){
      return http.get(`/subfamilia/?search=${search}&page_size=15`);
    }
    return http.get(`/subfamilia/`);
  }
}

export default new SubFamiliaDataService();