<template>
  <v-card
    class="mx-auto"
    max-width="800"
    outlined
    shaped
    elevation="3"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-h4 mb-5">
          <v-btn
            to="/family"
            icon
            class="hidden-xs-only">
            <v-icon x-large color="error">mdi-arrow-left-thin-circle-outline</v-icon>
          </v-btn>
          Edicion Presentacion de Productos
        </div>
        <v-list-item-title class="text-h7 mb-1">
          <v-text-field
            label="Id"
            v-model="currentPresentation.id"
            readonly
            ref="id"
          ></v-text-field>
        </v-list-item-title>

        <v-list-item-title class="text-h7 mb-1">
          <v-text-field
            :rules="[(v) => !!v || 'Descripción de la Familia es Requerida']"
            label="Descripción*"
            counter="200"
            required
            :maxlength="maxLengthDescription"
            v-model="currentPresentation.desc_pres"
          ></v-text-field>
        </v-list-item-title>

        <v-list-item-title class="text-h7 mb-1">
          <v-text-field
            v-model="currentPresentation.abre_pres"
            label="Abreviatura"
            required
            counter="10"
            :maxlength="maxLengthAbbreviation"
          ></v-text-field>
        </v-list-item-title>

        <v-list-item-title class="text-h7 mb-1">
          <v-switch
             v-model="currentPresentation.tipo_pres"
              label="Agrupa"
              color="primary"
              hide-details
            ></v-switch>
        </v-list-item-title>
        
      </v-list-item-content>

    </v-list-item>

    
      <v-card-actions class="mb-3">
        <v-btn color="primary" dark class="ml-auto ma-3" @click="updateFamily">
            Actualizar 
            <v-icon small>mdi-pencil-circle</v-icon>
        </v-btn>
        <v-btn color="dark" @click="clear">
          Limpiar
        </v-btn>
      </v-card-actions>
      <v-snackbar 
        v-model="snackbar"
        color="pink darken-4" 
        absolute 
        :vertical="vertical">
          {{ text_message }}
          <template v-slot:action="{ attrs }">
            <v-btn
              text
              v-bind="attrs"
              @click="restore"
            >
              Cerrar
            </v-btn>
          </template>
      </v-snackbar>
  </v-card>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength } from 'vuelidate/lib/validators'
  import PresentationDataService from "../../services/presentationDataService";

  export default {
    name: "editedPresentation",
    mixins: [validationMixin],
    validations: {
      desc_pres: { required, maxLength: maxLength(200) },
      abre_pres:{ maxLength :maxLength(3)},
    },

    data:() =>({
      currentPresentation: null,
      snackbar:false,
      text_message :'',
      desc_pres:'',
      abre_pres:'',
      tipo_pres: false,
      maxLengthDescription:200,
      maxLengthAbbreviation:10,
      dialog: false,
      vertical: true,
    }),
    
    methods: {
      getPresentation(id){
        
        PresentationDataService.get(id)
        .then(response => {
          this.currentPresentation = response.data.data;
          if(this.currentPresentation.tipo_pres == 'N'){
            this.currentPresentation.tipo_pres = false
          }else{
            this.currentPresentation.tipo_pres = true
          }
          
        })
        .catch(e => {
          console.log(e);
        });
      },

      focusInput(){
        this.$refs.currentPresentation.desc_pres.$refs.input.focus();
      },

      clear () {
        this.currentPresentation.desc_pres = ''
        this.currentPresentation.abre_pres = ''
        this.currentPresentation.tipo_pres = false
      },

      valid_form(){
        if(this.currentPresentation.desc_pres.length<4){
          return false;
        }
          return true;
      },

      restore(){
        if(this.currentPresentation.desc_pres.length<3){
          this.snackbar=false;
          return false;
        }
      
        this.$router.push('/presentation');
      },
      // Method Save
      updateFamily() {
        if(this.valid_form()==false){
          this.text_message ="No se puede Actualizar, porque la Descripcion de Presentacion es Incorrecta:";
          this.snackbar = true;
          return false;
        }
        const id = this.currentPresentation.id;
        const data_save = {
          desc_pres : this.currentPresentation.desc_pres,
          abre_pres : this.currentPresentation.abre_pres,
          tipo_pres : this.currentPresentation.tipo_pres == true ? "s": "n",
        };

        PresentationDataService.update(id,data_save)
        .then((response) => {
          this.text_message ="Datos Actualizados Exitosamente:"+response;
          this.snackbar = true;
          this.restore()
          return true;
        })
        .catch((e) => {
          console.log(e);
        });
      },

    },

    mounted() {
      console.log(this.$route.params.id);
      if(this.$route.params.id != 'undefined'){
        this.getPresentation(this.$route.params.id);
      }
      
    },
  }
</script>