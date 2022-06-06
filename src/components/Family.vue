<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="title" label="Buscar por cedula o Nombre"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn color="primary" large @click="searchTitle">
        Buscar
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Personas Naturales
          <v-card-actions v-if="natural.length > 0">
          <v-btn large color="primary" to="/add">
            Nuevo
          </v-btn>
        </v-card-actions>
        </v-card-title>

        <v-data-table
          dense
          :headers="headers"
          :items="natural"
          :hide-default-footer="false"
          :sort-by="['cedu_pena','seno_pena','prap_pena']"
          :page="page"
          :pageCount="numberOfPages"
          :options.sync="options"
          :server-items-length="totalNatural"
          :loading="loading"
          :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-skip-previous-circle',
            lastIcon: 'mdi-skip-next-circle',
            prevIcon: 'mdi-arrow-left-circle',
            nextIcon: 'mdi-arrow-right-circle'
          }"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon color="warning" small class="mr-2" @click="editNatural(item.id)">mdi-pencil</v-icon>
            <v-icon color="error" small @click="deleteNatural(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import NaturalDataService from "../services/NaturalDataService";
export default {
  name: "natural-list",
  data() {
    return {
      natural: [],
      title: "",
      page: 1,
      totalNatural: 0,
      numberOfPages: 0,
      options: {},
      loading: true,
      headers: [
        { text: "CEDULA", align: "start", sortable: false, value: "id" },
        { text: "NOMBRE(S)", value: "seno_pena", sortable: false },
        { text: "APELLIDO(S)", value: "prap_pena", sortable: false },
        { text: "ACCIONES", value: "actions", sortable: false },
      ],
    };
  },
  watch:{
    options:{
      handler(){
        this.listadoNatural();
      },
    },
    //deep: true,
  },
  methods: {
    listadoNatural() {
      this.loading = true;
      //console.log(this.options);
      const { page, itemsPerPage} = this.options;
      //console.log(page+" "+itemsPerPage);
       // let pageNumber = page -1;
      // console.log(pageNumber);

      NaturalDataService.getAll(page,itemsPerPage)
        .then((response) => {
          this.loading = false;
          this.natural = response.data.results.map(this.getDisplayNatural);
          this.totalNatural = response.data.count;
          this.numberOfPages = response.data.last_page;
          //pageNumber = response.data.per_page;
          //console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.listadoNatural();
    },

    removeAllNatural() {
      NaturalDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      NaturalDataService.findByTitle(this.title)
        .then((response) => {
          console.log(response.data.results);
          this.natural = response.data.results.map(this.getDisplayNatural);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editNatural(id) {
      this.$router.push({ name: "edit", params: { id: id } });
    },

    deleteNatural(id) {
      NaturalDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayNatural(Object) {
      return {
        id: Object.id,
        cedu_pena: Object.cedu_pena,
        prno_pena: Object.prno_pena,
        // seno_pena: Object.seno_pena,
        // prap_pena: Object.prap_pena,
        seap_pena: Object.seap_pena,
        sexo_pena: Object.sexo_pena,
        seno_pena: Object.nombre_completo.length > 30 ? Object.nombre_completo.substr(0, 30) + "..." : Object.nombre_completo,
        prap_pena: Object.apellido_completo.length > 30 ? Object.apellido_completo.substr(0, 30) + "..." : Object.apellido_completo,
      };
    },
  },
  mounted() {
    this.listadoNatural();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>
