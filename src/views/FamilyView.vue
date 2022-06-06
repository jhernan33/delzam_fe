<!-- <template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :options.sync="options"
      :server-items-length="totalDesserts"
      :loading="loading"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        totalDesserts: 0,
        desserts: [],
        loading: true,
        options: {},
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
      }
    },
    watch: {
      options: {
        handler () {
          this.getDataFromApi()
        },
        deep: true,
      },
    },
    methods: {
      getDataFromApi () {
        this.loading = true
        this.fakeApiCall().then(data => {
          this.desserts = data.items
          this.totalDesserts = data.total
          this.loading = false
        })
      },
      /**
       * In a real application this would be a call to fetch() or axios.get()
       */
      fakeApiCall () {
        return new Promise((resolve) => {
          const { sortBy, sortDesc, page, itemsPerPage } = this.options

          let items = this.getDesserts()
          const total = items.length

          if (sortBy.length === 1 && sortDesc.length === 1) {
            items = items.sort((a, b) => {
              const sortA = a[sortBy[0]]
              const sortB = b[sortBy[0]]

              if (sortDesc[0]) {
                if (sortA < sortB) return 1
                if (sortA > sortB) return -1
                return 0
              } else {
                if (sortA < sortB) return -1
                if (sortA > sortB) return 1
                return 0
              }
            })
          }

          if (itemsPerPage > 0) {
            items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
          }

          setTimeout(() => {
            resolve({
              items,
              total,
            })
          }, 1000)
        })
      },
      getDesserts () {
        return [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ]
      },
    },
  }
</script> -->
<template>
  <v-row class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="title" label="Buscar por Descripcion"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn color="primary" large @click="searchTitle">
        Buscar
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Familia de Productos
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
import FamilyDataService from "../services/FamilyDataService";
export default {
  name: "family-list",
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
          this.natural = response.data.results.map(this.getDisplayFamily);
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

