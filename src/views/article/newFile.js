import ArticleDataService from "../../services/ArticleDataService";

export default (await import('vue')).default.extend({
name: "article-list",
data() {
return {
dialog: false,
dialogDelete: false,
sortBy: 'desc_sufa',
sortDesc: false,
subfamily: [],
search: "",
ModelDeleted: false,
page: 1,
totalFamily: 0,
numberOfPages: 0,
options: {},
loading: true,
headers: [
{ text: "ID", align: "start", sortable: true, value: "id" },
{ text: "SIAE", align: "start", sortable: true, value: "codi_arti" },
{ text: "CODIGO", align: "start", sortable: true, value: "idae_arti" },
{ text: "DESCRIPCION", value: "desc_arti", sortable: true },
{ text: "SUBCATEGORIA", value: "subfamilia", sortable: true },
{ text: "COSTO", value: "ppre_arti", sortable: true },
{ text: "ACCIONES", value: "actions", sortable: false },
],
itemToDelete: {},
};
},
watch: {
options: {
handler() {
this.listadoSubFamily();
},
},
},
methods: {
showDeleteDialog(valores) {
this.itemToDelete = valores;
this.dialogDelete = !this.dialogDelete;
},

deleteSubFamily() {
const idSubFamily = this.itemToDelete.id;
ArticleDataService.delete(idSubFamily)
.then(() => {
this.dialogDelete = false;
this.refreshList();
})
.catch((e) => {
console.log(e);
});
},

updateSort(byDesc, event) {
if (byDesc == 'by') {
this.sortBy = event;
} else if (byDesc == 'desc') {
this.sortDesc = event;
}
},
focusInput() {
this.$refs.search.focus();
},
listadoSubFamily() {
this.loading = true;
const { page, itemsPerPage } = this.options;

ArticleDataService.getAll(page, itemsPerPage)
.then((response) => {
this.loading = false;
this.subfamily = response.data.results.map(this.getDisplaySubFamily);
this.totalFamily = response.data.count;
this.numberOfPages = response.data.last_page;
})
.catch((e) => {
console.log(e);
});
},

refreshList() {
this.listadoSubFamily();
},

clearSearch() {
this.listadoSubFamily();
},

onEnter() {
if (this.search.length < 1) {
this.clearSearch();
}
this.searchArticle();
},

searchArticle() {
let valueDeleted = false;
valueDeleted = this.ModelDeleted;
ArticleDataService.findByFamily(this.search, valueDeleted)
.then((response) => {
this.loading = true;
this.subfamily = response.data.results.map(this.getDisplaySubFamily);
this.totalFamily = response.data.count;
this.numberOfPages = response.data.last_page;
this.loading = false;
})
.catch((e) => {
console.log(e);
});
},

modiFamily(id) {
this.$router.push({ name: "editarticle", params: { id: id } });
},

getDisplaySubFamily(Object) {
return {
id: Object.id,
codi_arti: Object.codi_arti,
idae_arti: Object.idae_arti,
desc_arti: Object.desc_arti,
por1_arti: Object.por1_arti,
por2_arti: Object.por2_arti,
por3_arti: Object.por3_arti,
por4_arti: Object.por4_arti,
ppre_arti: Object.ppre_arti,
cos1_arti: Object.cos1_arti,
cos2_arti: Object.cos2_arti,
cos3_arti: Object.cos3_arti,
cos4_arti: Object.cos4_arti,
subfamilia: Object.subfamilia,
};
},
},

mounted() {
this.listadoSubFamily();
},
});
