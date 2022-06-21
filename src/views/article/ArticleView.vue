<template>
<v-card>
  <v-card-title>
      <div class="text-h5 mb-1">
        <v-btn
          to="/"
          icon
          class="hidden-xs-only">
          <v-icon x-large color="error">mdi-arrow-left-thin-circle-outline</v-icon>
        </v-btn>
      </div>
    Productos
    <v-spacer></v-spacer>
    <v-text-field 
      v-model="search"
      label="Que desea Buscar..."
      single-line
      hide-details
      clearable
      @click:clear="clearSearch()"
      @keyup.enter ="onEnter()"
      @keyup.delete="clearSearch()"
      class="pa-5"
      >
    </v-text-field>
    <v-btn class="pa-2" append-icon="mdi-magnify" @click="searchFamily">
      <v-icon color="error">mdi-archive-search</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
      <v-btn 
        color="primary"
        elevation="8"
        to="/addarticle"
        >Nuevo
      </v-btn>
      
  </v-card-title>
  <v-data-table
    :headers="headers"
    :items="subfamily"
    :hide-default-footer="false"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    @update:sort-by="updateSort('by', $event)"
    @update:sort-desc="updateSort('desc', $event)"
      :page="page"
      :pageCount="numberOfPages"
      :options.sync="options"
      :server-items-length="totalFamily"
      :loading="loading"
      loading-text="Cargando.. Espere por favor"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-skip-previous-circle',
        lastIcon: 'mdi-skip-next-circle',
        prevIcon: 'mdi-arrow-left-circle',
        nextIcon: 'mdi-arrow-right-circle'
      }"
      :items-per-page="5"
      class="elevation-1"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon color="warning" small class="mr-2" @click="modiFamily(item.id)">mdi-pencil</v-icon>
      <v-icon color="error" small @click="showDeleteDialog(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>

  <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
          <v-card-title>Eliminar</v-card-title>
          <v-card-text>Desea Eliminar el Producto: {{itemToDelete.desc_sufa}} ?</v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="dialogDelete = false">Cerrar</v-btn>
            <v-btn color="primary" @click="deleteSubFamily()">Borrar</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
</v-card>
</template>

<script>
import ArticleDataService from "../../services/ArticleDataService";

export default {
  name: "article-list",
  data() {
    return {
      dialog: false,
      dialogDelete:false,
      sortBy:'desc_sufa',
      sortDesc:false,
      subfamily: [],
      search: "",
      page: 1,
      totalFamily: 0,
      numberOfPages: 0,
      options: {},
      loading: true,
      headers: [
        { text: "ID", align: "start", sortable: true, value: "id" },
        { text: "CODIGO", align: "start", sortable: true, value: "idae_arti" },
        { text: "DESCRIPCION", value: "desc_arti", sortable: true },
        { text: "PRECIO 1", value: "por1_arti", sortable: true },
        { text: "PRECIO 2", value: "por2_arti", sortable: true },
        { text: "SUBCATEGORIA",value: "subfamilia", sortable: true},
        { text: "ACCIONES", value: "actions", sortable: false },
      ],
      itemToDelete: {},
    };
  },
  watch:{
    options:{
      handler(){
        this.listadoSubFamily();
      },
    },
  },
  methods: {

    showDeleteDialog(valores){
      this.itemToDelete = valores;
      this.dialogDelete = !this.dialogDelete
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

    updateSort(byDesc, event){
            if(byDesc == 'by'){
                this.sortBy = event
            }else if(byDesc == 'desc'){
                this.sortDesc = event
            }
        },
    focusInput(){
        this.$refs.search.focus();
      },
    listadoSubFamily() {
      this.loading = true;
      const { page, itemsPerPage} = this.options;

      ArticleDataService.getAll(page,itemsPerPage)
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

    clearSearch(){
      this.listadoSubFamily();
    },

    onEnter(){
      if(this.search.length<1){
        this.clearSearch();
      }
      this.searchFamily();
    },

    searchFamily() {
      ArticleDataService.findByFamily(this.search)
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
        idae_arti: Object.idae_arti,
        desc_arti: Object.desc_arti,
        por1_arti: Object.por1_arti,
        por2_arti: Object.por2_arti,
        por3_arti: Object.por3_arti,
        ppre_arti: Object.ppre_arti,
        subfamilia: Object.subfamilia,
      };
    },
  },

  mounted() {
    this.listadoSubFamily();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>