<template>
<v-card>
  <v-card-title>
    Familia de Productos
    <v-spacer></v-spacer>
    <v-text-field 
      v-model="title"
      append-icon="mdi-magnify"
      label="Buscar por Descripcion"
      single-line
      hide-details
      >
    </v-text-field>
    <v-spacer></v-spacer>
      <v-btn 
        color="primary"
        elevation="8"
        to="/addFamily"
        >Nuevo
      </v-btn>
      
  </v-card-title>
  <v-data-table
    :headers="headers"
    :items="family"
    :hide-default-footer="false"
    :sort-by="['id','desc_fami','abae_fami']"
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
      <v-icon color="warning" small class="mr-2" @click="editFamily(item.id)">mdi-pencil</v-icon>
      <v-icon color="error" small @click="deleteNatural(item.id)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</v-card>
</template>

<script>
import FamilyDataService from "../services/FamilyDataService";
export default {
  name: "family-list",
  data() {
    return {
      dialog: false,
      family: [],
      title: "",
      page: 1,
      totalFamily: 0,
      numberOfPages: 0,
      options: {},
      loading: true,
      headers: [
        { text: "ID", align: "start", sortable: false, value: "id" },
        { text: "DESCRIPCION", value: "desc_fami", sortable: false },
        { text: "ABREVIATAURA", value: "abae_fami", sortable: false },
        { text: "AGRUPA", value: "agru_fami", sortable: false },
        { text: "ACCIONES", value: "actions", sortable: false },
      ],
    };
  },
  watch:{
    options:{
      handler(){
        this.listadoFamily();
      },
    },
    //deep: true,
  },
  methods: {
    listadoFamily() {
      this.loading = true;
      //console.log(this.options);
      const { page, itemsPerPage} = this.options;
      //console.log(page+" "+itemsPerPage);
       // let pageNumber = page -1;
      // console.log(pageNumber);

      FamilyDataService.getAll(page,itemsPerPage)
        .then((response) => {
          this.loading = false;
          this.family = response.data.results.map(this.getDisplayFamily);
          this.totalFamily = response.data.count;
          this.numberOfPages = response.data.last_page;
          //pageNumber = response.data.per_page;
          //console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.listadoFamily();
    },

    removeAllNatural() {
      FamilyDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      FamilyDataService.findByTitle(this.title)
        .then((response) => {
          console.log(response.data.results);
          this.natural = response.data.results.map(this.getDisplayFamily());
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editNatural(id) {
      this.$router.push({ name: "edit", params: { id: id } });
    },

    deleteNatural(id) {
      FamilyDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayFamily(Object) {
      return {
        id: Object.id,
        desc_fami: Object.desc_fami,
        abae_fami: Object.abae_fami,
        agru_fami: Object.agru_fami,
      };
    },
  },
  mounted() {
    this.listadoFamily();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>


 <!-- <template>
   <div>
     <button @click="dialog=true">Open Dialog</button>
     <Child :dialog.sync="dialog" />
   </div>
</template>

<script>
import Child from './addFamilyView.vue'
export default {
    components: {
      Child
    },
    data() {
      return {
        dialog: false
      }
   }
}
</script> -->
