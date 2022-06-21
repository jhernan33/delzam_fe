import http from "../http-common";

class ArticleDataService {

  getAll(page,itemsPerPage) {
    if(page !== 'undefined' || page !=='null'){
      return http.get("/articulo?page_size="+itemsPerPage+"&page="+page);
    }else{
      return http.get("/articulo");
    }
  }

  get(id) {
    return http.get(`/articulo/${id}`);
  }

  create(data) {
    return http.post("/articulo/create/", data);
  }

  update(id, data) {
    return http.put(`/articulo/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/articulo/delete/${id}`);
  }


  findByFamily(search) {
    if(search.length>0){
      return http.get(`/articulo/?search=${search}&page_size=15`);
    }
    return http.get(`/articulo/`);
  }
}

export default new ArticleDataService();