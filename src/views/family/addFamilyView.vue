<template>
<form>
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
          Registro de Categoria Productos
        </div>
        <v-list-item-title class="text-h7 mb-1">
          <v-text-field
            v-model="description"
            :rules="[(v) => !!v || 'Descripción de la Categoria es Requerida']"
            label="Descripción*"
            counter="200"
            required
            :maxlength="maxLengthDescription"
            ref="txtdescription"
          ></v-text-field>
        </v-list-item-title>

        <v-list-item-title class="text-h7 mb-1">
          <v-text-field
            v-model="abbreviation"
            label="Abreviatura"
            required
            counter="3"
            :maxlength="maxLengthAbbreviation"
          ></v-text-field>
        </v-list-item-title>

        <v-list-item-title class="text-h7 mb-1">
          <v-switch
             v-model="groups"
              label="Agrupa"
              color="primary"
              hide-details
            ></v-switch>
        </v-list-item-title>
        
      </v-list-item-content>

      <!-- <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar> -->
    </v-list-item>
    
      <v-card-actions class="mb-3">
     
        <v-btn color="primary" dark class="ml-auto ma-3" @click="saveFamily">
            Guardar 
            <v-icon small>mdi-plus-circle-outline</v-icon>
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
  </form>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength } from 'vuelidate/lib/validators'
  import FamilyDataService from "../../services/FamilyDataService";

  export default {
    mixins: [validationMixin],
    validations: {
      description: { required, maxLength: maxLength(200) },
      abbreviation:{ maxLength :maxLength(3)},
    },

    data:() =>({
      snackbar:false,
      text_message :'',
      description:'',
      abbreviation:'',
      groups: false,
      maxLengthDescription:200,
      maxLengthAbbreviation:3,
      search_family: [],
      dialog: false,
      vertical: true,
    }),
    mounted(){
      this.$nextTick(() =>{
        setTimeout(() =>{
          this.focusInput();
        })
      })
    },
    methods:{
      focusInput(){
        this.$refs.txtdescription.$refs.input.focus();
      },
      clear () {
        this.$v.$reset()
        this.description = ''
        this.abbreviation = ''
        this.groups = false
      },
      valid_form(){
        if(this.description.length<4){
          return false;
        }
          return true;
      },
      restore(){
        this.snackbar=false;
        this.$router.push('/family');
      },
      // Method Save
      saveFamily() {
        if(this.valid_form()==false){
          this.text_message ="No se Puede Guardar"
          console.log("No se Puede Guardar");
          return false;
        }

        const data_save = {
          desc_fami : this.description,
          abae_fami : this.abbreviation,
          agru_fami : this.groups == true ? "s": "n",
        };
        
        FamilyDataService.create(data_save)
        .then((response) => {
          this.text_message ="Datos Guardados Exitosamente:"+response.data.data['id'];
          this.snackbar = true;
          return true;
        })
        .catch((e) => {
          console.log(e);
        });

      },

    }
  }
</script>