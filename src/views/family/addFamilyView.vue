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
          Registro de Familias Productos
        </div>
        <v-list-item-title class="text-h7 mb-1">
          <v-text-field
            v-model="description"
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
        
        <!-- <v-dialog persistent v-model="dialog" max-width="400" max-heigth="200">
                  <template v-slot:activator="{ on }">
                    <div class="d-flex">
                        <v-btn color="primary" dark class="ml-auto ma-3" v-on="on" @click="saveFamily">
                            Guardar 
                            <v-icon small>mdi-plus-circle-outline</v-icon>
                        </v-btn>
                    </div>
                  </template>

                  <v-card>
                    <v-card-title>
                        <span>Familia</span>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                          
                          <v-col cols="12" sm="12">
                            <h3>Datos Guardados Exitosamente</h3>
                          </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary"   to="/family" >Continuar</v-btn>
                    </v-card-actions>
                  </v-card>


        </v-dialog> -->
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
          //console.log("Validando...==>"+this.description.length);
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
          // return {
          //   error:true,
          //   message: "Se deb Ingresar la Descripcion"
          // }
        }
        //console.log(this.valid_form());
        // if(this.valid_form()){
        //   this.text_snack ="No se Puede Guardar"  
        // }
        const data_save = {
          desc_fami : this.description,
          abae_fami : this.abbreviation,
          agru_fami : this.groups == true ? "s": "n",
        };
        
        FamilyDataService.create(data_save)
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
        //this.snackbar = true;
        // NaturalDataService.create(data)
        //   .then((response) => {
        //     this.tutorial.id = response.data.id;
        //     console.log(response.data);
        //     this.submitted = true;
        //   })
        //   .catch((e) => {
        //     console.log(e);
        //   });
      },

    // searchFamily(){
    //   let description = this.search_natural.desc_fami;
      
    //   FamilyDataService.getCedula(this.search_natural.cedu_pena)
    //     .then((response) => {
    //       this.search_natural = response.data.map(this.getDisplayNatural);
          
    //       if(Object.keys(this.search_natural).length >0){
    //         this.text_snack ="Cedula Encontrada"
    //         this.search_natural.cedu_pena = this.search_natural[0]['cedu_pena'];
    //         this.search_natural.prno_pena = this.search_natural[0]['prno_pena'];
    //         this.search_natural.seno_pena = this.search_natural[0]['seno_pena'];
    //         this.search_natural.prap_pena = this.search_natural[0]['prap_pena'];
    //       }else{
    //         this.search_natural.cedu_pena = cedula;
    //         this.text_snack ="Numero de Cedula no Registrado"
    //       }
    //       this.snackbar = true;
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },


    }
  }
</script>