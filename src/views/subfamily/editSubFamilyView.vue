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
          Registro de Familias Productos
        </div>
        <v-list-item-title class="text-h7 mb-1">
          <v-text-field
            label="Id"
            v-model="currentFamily.id"
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
            v-model="currentFamily.desc_fami"
          ></v-text-field>
        </v-list-item-title>

        <v-list-item-title class="text-h7 mb-1">
          <v-text-field
            v-model="currentFamily.abae_fami"
            label="Abreviatura"
            required
            counter="3"
            :maxlength="maxLengthAbbreviation"
          ></v-text-field>
        </v-list-item-title>

        <v-list-item-title class="text-h7 mb-1">
          <v-switch
             v-model="currentFamily.agru_fami"
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
  import FamilyDataService from "../../services/FamilyDataService";

  export default {
    name: "editedFamily",
    mixins: [validationMixin],
    validations: {
      desc_fami: { required, maxLength: maxLength(200) },
      abae_fami:{ maxLength :maxLength(3)},
    },

    data:() =>({
      currentFamily: null,
      snackbar:false,
      text_message :'',
      desc_fami:'',
      abae_fami:'',
      agru_fami: false,
      maxLengthDescription:200,
      maxLengthAbbreviation:3,
      dialog: false,
      vertical: true,
    }),
    
    methods: {
      getFamily(id){
        
        FamilyDataService.get(id)
        .then(response => {
          this.currentFamily = response.data.data;
          if(this.currentFamily.agru_fami == 'N'){
            this.currentFamily.agru_fami = false
          }else{
            this.currentFamily.agru_fami = true
          }
          
        })
        .catch(e => {
          console.log(e);
        });
      },

      focusInput(){
        this.$refs.currentFamily.desc_fami.$refs.input.focus();
      },

      clear () {
        this.currentFamily.desc_fami = ''
        this.currentFamily.abae_fami = ''
        this.currentFamily.agru_fami = false
      },

      valid_form(){
        if(this.currentFamily.desc_fami.length<4){
          return false;
        }
          return true;
      },

      restore(){
        if(this.currentFamily.desc_fami.length<3){
          this.snackbar=false;
          return false;
        }
      
        this.$router.push('/family');
      },
      // Method Save
      updateFamily() {
        if(this.valid_form()==false){
          this.text_message ="No se puede Actualizar, porque la Descripcion de Familia es Incorrecta:";
          this.snackbar = true;
          return false;
        }
        const id = this.currentFamily.id;
        const data_save = {
          desc_fami : this.currentFamily.desc_fami,
          abae_fami : this.currentFamily.abae_fami,
          agru_fami : this.currentFamily.agru_fami == true ? "s": "n",
        };

        FamilyDataService.update(id,data_save)
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
      this.getFamily(this.$route.params.id);
    },
  }
</script>