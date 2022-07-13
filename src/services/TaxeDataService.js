import http from "../http-common";

class TaxeDataService {

  getAll(page,itemsPerPage) {
    if(page !== 'undefined' || page !=='null'){
      return http.get("/iva?page_size="+itemsPerPage+"&page="+page);
    }else{
      return http.get("/iva");
    }
  }

  get(id) {
    return http.get(`/iva/${id}`);
  }

  create(data) {
    return http.post("/iva/create/", data);
  }

  update(id, data) {
    return http.put(`/iva/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/iva/delete/${id}`);
  }

  findByFamily(search) {
    if(search.length>0){
      return http.get(`/iva/?search=${search}&page_size=15`);
    }
    return http.get(`/iva/`);
  }

  dropdown(){
    return http.get("/iva/combo/");
  }
}

export default new TaxeDataService();