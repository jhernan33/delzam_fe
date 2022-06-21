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
            to="/subfamily"
            icon
            class="hidden-xs-only">
            <v-icon x-large color="error">mdi-arrow-left-thin-circle-outline</v-icon>
          </v-btn>
          Editar Sub-Categoria de Producto
        </div>
        <v-list-item-title class="text-h7 mb-1">
          <v-text-field
            label="Id"
            v-model="currentSubFamily.id"
            readonly
            ref="id"
          ></v-text-field>
        </v-list-item-title>

        <v-list-item-title class="text-h7 mb-1">
          <v-text-field
            :rules="[(v) => !!v || 'Descripción de la Sub-Categoria es Requerida']"
            label="Descripción*"
            counter="200"
            required
            :maxlength="maxLengthDescription"
            v-model="currentSubFamily.desc_sufa"
          ></v-text-field>
        </v-list-item-title>

        <v-list-item-title class="text-h7 mb-1">
          <v-text-field
            v-model="currentSubFamily.abae_sufa"
            label="Abreviatura"
            required
            counter="3"
            :maxlength="maxLengthAbbreviation"
          ></v-text-field>
        </v-list-item-title>

        <v-list-item-title class="text-h7 mb-7">
          <v-switch
             v-model="currentSubFamily.agru_sufa"
              label="Agrupa"
              color="primary"
              hide-details
            ></v-switch>
        </v-list-item-title>

        <v-list-item-title class="text-h7 mb-1">
          <v-select
            v-model="currentSubFamily.codi_fami"
            :rules="[(v) => !!v || 'Debe Seleccionar una Categoria es Requerida']"
            dense
            clearable
            label="Familia"
            item-text="desc_fami"
            item-value="id"
            :items="family"
            @change="DropDownFamily">
          </v-select>
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
  import SubFamilyDataService from "../../services/SubFamilyDataService";
  import FamilyDataService from "../../services/FamilyDataService";

  export default {
    name: "editedSubFamily",
    mixins: [validationMixin],
    validations: {
      desc_fami: { required, maxLength: maxLength(200) },
      abae_fami:{ maxLength :maxLength(3)},
    },

    data:() =>({
      currentSubFamily: null,
      snackbar:false,
      text_message :'',
      txtdescription:'',
      txtabbreviation:'',
      optgroups: false,
      cbofamily:'',
      maxLengthDescription:200,
      maxLengthAbbreviation:3,
      dialog: false,
      vertical: true,
    }),
    
    methods: {

      getSubFamily(id){
        SubFamilyDataService.get(id)
        .then(response => {
          console.log(response.data.data);
          this.currentSubFamily = response.data.data;
          if(this.currentSubFamily.agru_sufa == 'N'){
            this.currentSubFamily.agru_sufa = false
          }else{
            this.currentSubFamily.agru_sufa = true
          }
          
        })
        .catch(e => {
          console.log(e);
        });
      },

      focusInput(){
        this.$refs.currentSubFamily.desc_fami.$refs.input.focus();
      },

      clear () {
        this.currentSubFamily.desc_sufa = ''
        this.currentSubFamily.abae_sufa = ''
        this.currentSubFamily.agru_sufa = false
      },

      valid_form(){
        if(this.currentSubFamily.desc_sufa.length<4){
          return false;
        }
          return true;
      },

      restore(){
        if(this.currentSubFamily.desc_sufa.length<3){
          this.snackbar=false;
          return false;
        }
      
        this.$router.push('/subfamily');
      },
      // Method Save
      updateFamily() {
        if(this.valid_form()==false){
          this.text_message ="No se puede Actualizar, porque la Descripcion de Familia es Incorrecta:";
          this.snackbar = true;
          return false;
        }
        const id = this.currentSubFamily.id;
        const data_save = {
          desc_sufa : this.currentSubFamily.desc_sufa,
          abae_sufa : this.currentSubFamily.abae_sufa,
          agru_sufa : this.currentSubFamily.agru_sufa == true ? "s": "n",
          codi_fami : this.currentSubFamily.codi_fami,
        };

        SubFamilyDataService.update(id,data_save)
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

      /**
       * DropDown Family
       */
      DropDownFamily() {
          FamilyDataService.dropdown()
          .then((response) => {
            this.family = response.data.map(this.getDisplayFamily);
          })
          .catch((e) => {
            console.log(e);
          });
      },

      getDisplayFamily(family){
        return {
          id : family.id,
          desc_fami : family.desc_fami,
        }
      },

    },

    mounted() {
      this.getSubFamily(this.$route.params.id);
      this.DropDownFamily();
    },
  }
</script>