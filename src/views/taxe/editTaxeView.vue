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
            to="/tax"
            icon
            class="hidden-xs-only">
            <v-icon x-large color="error">mdi-arrow-left-thin-circle-outline</v-icon>
          </v-btn>
          Editar IVA
        </div>
        <v-list-item-title class="text-h7 mb-1">
          <v-text-field
            label="Id"
            v-model="currentTaxe.id"
            readonly
            ref="id"
          ></v-text-field>
        </v-list-item-title>

        <v-list-item-title class="text-h7 mb-1">
          <v-text-field
            :rules="[(v) => !!v || 'Descripción del IVA es Requerida']"
            label="Descripción*"
            counter="120"
            required
            :maxlength="maxLengthDescription"
            v-model="currentTaxe.desc_ivag"
          ></v-text-field>
        </v-list-item-title>
        
      </v-list-item-content>

    </v-list-item>

    
      <v-card-actions class="mb-3">
        <v-btn color="primary" dark class="ml-auto ma-3" @click="updateTaxe">
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
  import TaxeDataService from "../../services/TaxeDataService";

  export default {
    name: "editedTaxe",
    mixins: [validationMixin],
    validations: {
      desc_ivag: { required, maxLength: maxLength(120) },
    },

    data:() =>({
      currentTaxe: null,
      snackbar:false,
      text_message :'',
      desc_ivag:'',
      abae_fami:'',
      agru_fami: false,
      maxLengthDescription:120,
      maxLengthAbbreviation:3,
      dialog: false,
      vertical: true,
    }),
    
    methods: {
      getTaxe(id){
        
        TaxeDataService.get(id)
        .then(response => {
          this.currentTaxe = response.data.data;          
        })
        .catch(e => {
          console.log(e);
        });
      },

      focusInput(){
        this.$refs.currentTaxe.desc_ivag.$refs.input.focus();
      },

      clear () {
        this.currentTaxe.desc_ivag = ''
      },

      valid_form(){
        if(this.currentTaxe.desc_ivag.length<4){
          return false;
        }
          return true;
      },

      restore(){
        if(this.currentTaxe.desc_ivag.length<3){
          this.snackbar=false;
          return false;
        }
      
        this.$router.push('/tax');
      },
      // Method Save
      updateTaxe() {
        if(this.valid_form()==false){
          this.text_message ="No se puede Actualizar, porque la Descripcion del IVA es Incorrecta:";
          this.snackbar = true;
          return false;
        }
        const id = this.currentTaxe.id;
        const data_save = {
          desc_ivag : this.currentTaxe.desc_ivag,
        };

        TaxeDataService.update(id,data_save)
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
      this.getTaxe(this.$route.params.id);
    },
  }
</script>