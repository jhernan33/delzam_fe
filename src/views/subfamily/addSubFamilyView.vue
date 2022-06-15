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
            to="/subfamily"
            icon
            class="hidden-xs-only">
            <v-icon x-large color="error">mdi-arrow-left-thin-circle-outline</v-icon>
          </v-btn>
          Registro de Sub-Familias Productos
        </div>
        <v-list-item-title class="text-h7 mb-1">
          <v-text-field
            v-model="txtdescription"
            :rules="[(v) => !!v || 'Descripción de la Familia es Requerida']"
            label="Descripción*"
            counter="200"
            required
            :maxlength="maxLengthDescription"
            ref="txtdescription"
          ></v-text-field>
        </v-list-item-title>

        <v-list-item-title class="text-h7 mb-1">
          <v-text-field
            v-model="txtabbreviation"
            label="Abreviatura"
            required
            counter="3"
            :maxlength="maxLengthAbbreviation"
          ></v-text-field>
        </v-list-item-title>

        <v-list-item-title class="text-h7 mb-7">
          <v-switch
             v-model="optgroups"
              label="Agrupa"
              color="primary"
              hide-details
            ></v-switch>
        </v-list-item-title>

        <v-list-item-title class="text-h7 mb-1">
          <v-select
            v-model="cbofamily"
            :rules="[(v) => !!v || 'Debe Seleccionar una Familia es Requerida']"
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
        
        <v-btn color="primary" dark class="ml-auto ma-3" @click="saveSubFamily">
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
  import SubFamilyDataService from "../../services/SubFamilyDataService";
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
      txtdescription:'',
      txtabbreviation:'',
      optgroups: false,
      cbofamily:'',
      maxLengthDescription:200,
      maxLengthAbbreviation:3,
      search_family: [],
      dialog: false,
      vertical: true,
      family : [],
    }),
    mounted(){
      this.DropDownFamily();
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
        this.txtdescription = ''
        this.txtabbreviation = ''
        this.optgroups = false
        this.cbofamily = ''
      },
      valid_form(){
        if(this.txtdescription.length<4){
          return false;
        }
          return true;
      },
      restore(){
        this.snackbar=false;
        this.$router.push('/subfamily');
      },
      // Method Save
      saveSubFamily() {
        if(this.valid_form()==false){
          this.text_message ="No se Puede Guardar"
          console.log("No se Puede Guardar");
          return false;
        }
        const data_save = {
          desc_sufa : this.txtdescription,
          abae_sufa : this.txtabbreviation,
          agru_sufa : this.optgroups == true ? "s": "n",
          codi_fami : this.cbofamily,
        };
        
        SubFamilyDataService.create(data_save)
        .then((response) => {
          // console.log(response.data);
          // console.log(response.data.data['id']);
          this.text_message ="Datos Guardados Exitosamente:"+response.data.data['id'];
          this.snackbar = true;
          //this.restore()
          return true;
          //this.submitted = true;
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

    }
  }
</script>