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
    IVA
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
    <v-btn class="pa-2" append-icon="mdi-magnify" @click="searchTaxe">
      <v-icon color="error">mdi-archive-search</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
      <v-btn 
        color="primary"
        elevation="8"
        to="/addTax"
        >Nuevo
      </v-btn>
      
  </v-card-title>
  <v-data-table
    :headers="headers"
    :items="family"
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
        nextIcon: 'mdi-arrow-right-c/*  */ircle'
      }"
      :items-per-page="5"
      class="elevation-1"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon color="warning" small class="mr-2" @click="modiTaxe(item.id)">mdi-pencil</v-icon>
      <v-icon color="error" small @click="showDeleteDialog(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>

  <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
          <v-card-title>Eliminar</v-card-title>
          <v-card-text>Desea Eliminar el IVA: {{itemToDelete.desc_ivag}} ?</v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="dialogDelete = false">Cerrar</v-btn>
            <v-btn color="primary" @click="deleteTaxe()">Borrar</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
</v-card>
</template>

<script>
import TaxeDataService from "../../services/TaxeDataService";
export default {
  name: "family-list",
  data() {
    return {
      dialog: false,
      dialogDelete:false,
      sortBy:'desc_ivag',
      sortDesc:false,
      family: [],
      search: "",
      page: 1,
      totalFamily: 0,
      numberOfPages: 0,
      options: {},
      loading: true,
      headers: [
        { text: "ID", align: "start", sortable: true, value: "id" },
        { text: "DESCRIPCION", value: "desc_ivag", sortable: true },
        { text: "ACCIONES", value: "actions", sortable: false },
      ],
      itemToDelete: {},
    };
  },
  watch:{
    options:{
      handler(){
        this.listadoTaxe();
      },
    },
  },
  methods: {

    showDeleteDialog(valores){
      this.itemToDelete = valores;
      this.dialogDelete = !this.dialogDelete
    },

    deleteTaxe() {
      const idTaxe = this.itemToDelete.id;
      TaxeDataService.delete(idTaxe)
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
    listadoTaxe() {
      this.loading = true;
      const { page, itemsPerPage} = this.options;

      TaxeDataService.getAll(page,itemsPerPage)
        .then((response) => {
          this.loading = false;
          this.family = response.data.results.map(this.getDisplayTaxe);
          this.totalFamily = response.data.count;
          this.numberOfPages = response.data.last_page;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.listadoTaxe();
    },

    clearSearch(){
      this.listadoTaxe();
    },

    onEnter(){
      if(this.search.length<1){
        this.clearSearch();
      }
      this.searchTaxe();
    },

    searchTaxe() {
      TaxeDataService.findByFamily(this.search)
        .then((response) => {
          this.loading = true;
          this.family = response.data.results.map(this.getDisplayTaxe);
          this.totalFamily = response.data.count;
          this.numberOfPages = response.data.last_page;
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    modiTaxe(id) {
      this.$router.push({ name: "editTax", params: { id: id } });
    },

    getDisplayTaxe(Object) {
      return {
        id: Object.id,
        desc_ivag: Object.desc_ivag,
      };
    },
  },

  mounted() {
    this.listadoTaxe();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>