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
            to="/iva"
            icon
            class="hidden-xs-only">
            <v-icon x-large color="error">mdi-arrow-left-thin-circle-outline</v-icon>
          </v-btn>
          Registro de IVA
        </div>
        <v-list-item-title class="text-h7 mb-1">
          <v-text-field
            v-model="description"
            :rules="[(v) => !!v || 'Descripción del IVA es Requerida']"
            label="Descripción*"
            counter="120"
            required
            :maxlength="maxLengthDescription"
            ref="txtdescription"
          ></v-text-field>
        </v-list-item-title>
        
      </v-list-item-content>

    </v-list-item>
    
      <v-card-actions class="mb-3">
     
        <v-btn color="primary" dark class="ml-auto ma-3" @click="saveTaxe">
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
  import TaxeDataService from "../../services/TaxeDataService";

  export default {
    mixins: [validationMixin],
    validations: {
      description: { required, maxLength: maxLength(120) },
    },

    data:() =>({
      snackbar:false,
      text_message :'',
      description:'',
      maxLengthDescription:120,
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
      },
      valid_form(){
        if(this.description.length<4){
          return false;
        }
          return true;
      },
      restore(){
        this.snackbar=false;
        this.$router.push('/tax');
      },
      // Method Save
      saveTaxe() {
        if(this.valid_form()==false){
          this.text_message ="No se Puede Guardar"
          console.log("No se Puede Guardar");
          return false;
        }

        const data_save = {
          desc_ivag : this.description,
        };
        
        TaxeDataService.create(data_save)
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