import http from "../http-common";

class PrestentationDataService {

  getAll(page,itemsPerPage) {
    if(page !== 'undefined' || page !=='null'){
      return http.get("/presentacion?page_size="+itemsPerPage+"&page="+page);
    }else{
      return http.get("/presentacion");
    }
  }

  get(id) {
    return http.get(`/presentacion/${id}`);
  }

  create(data) {
    return http.post("/presentacion/create/", data);
  }

  update(id, data) {
    return http.put(`/presentacion/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/presentacion/delete/${id}`);
  }

  findByFamily(search) {
    if(search.length>0){
      return http.get(`/presentacion/?search=${search}&page_size=15`);
    }
    return http.get(`/presentacion/`);
  }

  dropdown(){
    return http.get("/presentacion/combo/");
  }

}

export default new PrestentationDataService();