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
    Presentacion de Productos
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
    <v-btn class="pa-2" append-icon="mdi-magnify" @click="searchPresentation">
      <v-icon color="error">mdi-archive-search</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
      <v-btn 
        color="primary"
        elevation="8"
        to="/addPresentation"
        >Nuevo
      </v-btn>
      
  </v-card-title>
  <v-data-table
    :headers="headers"
    :items="presentation"
    :hide-default-footer="false"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    @update:sort-by="updateSort('by', $event)"
    @update:sort-desc="updateSort('desc', $event)"
      :page="page"
      :pageCount="numberOfPages"
      :options.sync="options"
      :server-items-length="totalPresentation"
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
      <v-icon color="warning" small class="mr-2" @click="modiPresentation(item.id)">mdi-pencil</v-icon>
      <v-icon color="error" small @click="showDeleteDialog(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>

  <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
          <v-card-title>Eliminar</v-card-title>
          <v-card-text>Desea Eliminar la Presentacion: {{itemToDelete.desc_pres}} ?</v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="dialogDelete = false">Cerrar</v-btn>
            <v-btn color="primary" @click="deletePresentation()">Borrar</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
</v-card>
</template>

<script>
import PresentationDataService from "../../services/presentationDataService";
export default {
  name: "presentation-list",
  data() {
    return {
      dialog: false,
      dialogDelete:false,
      sortBy:'desc_pres',
      sortDesc:false,
      presentation: [],
      search: "",
      page: 1,
      totalPresentation: 0,
      numberOfPages: 0,
      options: {},
      loading: true,
      headers: [
        { text: "ID", align: "start", sortable: true, value: "id" },
        { text: "DESCRIPCION", value: "desc_pres", sortable: true },
        { text: "ABREVIATAURA", value: "abre_pres", sortable: true },
        { text: "TIPO", value: "tipo_pres", sortable: true },
        { text: "ACCIONES", value: "actions", sortable: false },
      ],
      itemToDelete: {},
    };
  },
  watch:{
    options:{
      handler(){
        this.listPresentation();
      },
    },
  },
  methods: {

    showDeleteDialog(valores){
      this.itemToDelete = valores;
      this.dialogDelete = !this.dialogDelete
    },

    deletePresentation() {
      const idFamily = this.itemToDelete.id;
      PresentationDataService.delete(idFamily)
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
    listPresentation() {
      this.loading = true;
      const { page, itemsPerPage} = this.options;

      PresentationDataService.getAll(page,itemsPerPage)
        .then((response) => {
          this.loading = false;
          this.presentation = response.data.results.map(this.getDisplayPresentation);
          this.totalPresentation = response.data.count;
          this.numberOfPages = response.data.last_page;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.listPresentation();
    },

    clearSearch(){
      this.listPresentation();
    },

    onEnter(){
      if(this.search.length<1){
        this.clearSearch();
      }
      this.searchPresentation();
    },

    searchPresentation() {
      PresentationDataService.findByFamily(this.search)
        .then((response) => {
          this.loading = true;
          this.presentation = response.data.results.map(this.getDisplayPresentation);
          this.totalPresentation = response.data.count;
          this.numberOfPages = response.data.last_page;
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    modiPresentation(id) {
      this.$router.push({ name: "editpresentation", params: { id: id } });
    },

    getDisplayPresentation(Object) {
      return {
        id: Object.id,
        desc_pres: Object.desc_pres,
        abre_pres: Object.abre_pres,
        tipo_pres: Object.tipo_pres,
      };
    },
  },

  mounted() {
    this.listPresentation();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>