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
            to="/article"
            icon
            class="hidden-xs-only">
            <v-icon x-large color="error">mdi-arrow-left-thin-circle-outline</v-icon>
          </v-btn>
          Editar Articulo
        </div>
        <v-list-item-title class="text-h7 mb-1">
          <v-text-field
            v-model="ModelCode"
            :rules="[(v) => !!v || 'Codigo del Articulo es Requerido']"
            label="Codigo*"
            counter="15"
            required
            readonly
            :maxlength="maxLengthCode"
            ref="txtcode"
          ></v-text-field>
        </v-list-item-title>

        <v-list-item-title class="text-h7 mb-1">
          <v-text-field
            v-model="Modeldescription"
            :rules="[(v) => !!v || 'Descripción de la Familia es Requerida']"
            label="Descripción*"
            counter="200"
            clearable
            required
            :maxlength="maxLengthDescription"
            ref="txtdescription"
          ></v-text-field>
        </v-list-item-title>

        <v-list-item-title class="text-h7 mb-1">
          <v-text-field
            v-model="ModelCodebar"
            label="Codigo de Barras"
            counter="30"
            required
            clearable
            :maxlength="maxLengthCodeBar"
            ref="txtcodebar"
          ></v-text-field>
        </v-list-item-title>

        <v-container>
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <v-subheader class="mb-1">Cantidad Minima</v-subheader>
                <v-slider
                    v-model="ModelMinimumAmount"
                    :max="999"
                    :min="1"
                    class="align-center"
                  >
                  <template v-slot:append>
                      <v-text-field
                        v-model="ModelMinimumAmount"
                        class="mt-0 pt-0"
                        type="number"
                        min="1"
                        style="width: 60px"
                      ></v-text-field>
                    </template>
                  </v-slider>
              </v-col>

              <v-col
                cols="12"
                md="6"
              >
                <v-subheader class="mb-1">Cantidad Maxima</v-subheader>
                <v-slider
                    v-model="ModelMaximumAmount"
                    :max="99999"
                    :min="ModelMinimumAmount"
                    class="align-center"
                  >
                  <template v-slot:append>
                      <v-text-field
                        v-model="ModelMaximumAmount"
                        class="mt-0 pt-0"
                        type="number"
                        min="1"
                        style="width: 60px"
                      ></v-text-field>
                    </template>
                  </v-slider>
              </v-col>

            </v-row>
          </v-container>


          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="3"
              >
                <vuetify-money
                  v-model="ModelPrecArti"
                  v-bind:label="label_preca"
                  v-bind:placeholder="placeholder_preca"
                  v-bind:readonly="false"
                  v-bind:disabled="false"
                  v-bind:outlined="false"
                  v-bind:clearable="true"
                  v-bind:valueWhenIsEmpty="valueWhenIsEmpty"
                  v-bind:options="options"
                  v-bind:properties="properties"
                />
              </v-col>

              <v-col
                cols="12"
                md="3"
              >
                <vuetify-money
                  v-model="ModelPorc1"
                  v-bind:label="label_porc1"
                  v-bind:placeholder="placeholder_porc1"
                  v-bind:readonly="false"
                  v-bind:disabled="false"
                  v-bind:outlined="false"
                  v-bind:clearable="true"
                  v-bind:valueWhenIsEmpty="valueWhenIsEmpty"
                  v-bind:options="options"
                  v-bind:properties="properties"
                />
              </v-col>

              <v-col
                cols="12"
                md="3"
              >
                <vuetify-money
                  v-model="ModelPorc2"
                  v-bind:label="label_porc2"
                  v-bind:placeholder="placeholder_porc2"
                  v-bind:readonly="false"
                  v-bind:disabled="false"
                  v-bind:outlined="false"
                  v-bind:clearable="true"
                  v-bind:valueWhenIsEmpty="valueWhenIsEmpty"
                  v-bind:options="options"
                  v-bind:properties="properties"
                />
              </v-col>

              <v-col
                cols="12"
                md="3"
              >
                <vuetify-money
                  v-model="ModelPorc3"
                  v-bind:label="label_porc3"
                  v-bind:placeholder="placeholder_porc3"
                  v-bind:readonly="false"
                  v-bind:disabled="false"
                  v-bind:outlined="false"
                  v-bind:clearable="true"
                  v-bind:valueWhenIsEmpty="valueWhenIsEmpty"
                  v-bind:options="options"
                  v-bind:properties="properties"
                />
              </v-col>

            </v-row>
          </v-container>

           <v-container>
            <v-row>
              <v-col
                cols="12"
                md="4"
              >
                <v-select
                  v-model="ModelPresentationSale"
                  dense
                  clearable
                  label="Presentacion Venta"
                  item-text="desc_pres"
                  item-value="id"
                  :items="cboPresentation"
                  @change="DropDownPresentation">
                </v-select>
              </v-col>

              <v-col
                cols="12"
                md="2"
              >
                <v-text-field
                  :counter="10"
                  v-model="ModelCapacitySale"
                  label="Capacidad Venta"
                  required
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-select
                  v-model="ModelPresentationPurchase"
                  dense
                  clearable
                  label="Presentacion Compra"
                  item-text="desc_pres"
                  item-value="id"
                  :items="cboPresentation"
                  @change="DropDownPresentation">
                </v-select>
              </v-col>

              <v-col
                cols="12"
                md="2"
              >
                <v-text-field
                  v-model="ModelCapacityPurchase"
                  :counter="10"
                  label="Capacidad Compra"
                  required
                ></v-text-field>
              </v-col>


            </v-row>
          </v-container>

        <v-container>
          <v-row>
            <v-col cols="6" md="2">
              <v-switch
                v-model="ModelExempt"
                label="Exento"
                color="primary"
                hide-details
              ></v-switch>
            </v-col>
            <v-col cols="6" md="2">
              <v-switch
                v-model="ModelProceeds"
                label="Procede"
                color="primary"
                hide-details
              ></v-switch>
            </v-col>
          </v-row>
        </v-container>
          <v-row>
            <v-col cols="6" md="6">
               <v-select
                v-model="ModelFamily"
                :rules="[(v) => !!v || 'Debe Seleccionar una Categoria es Requerida']"
                dense
                clearable
                label="Categoria"
                item-text="desc_fami"
                item-value="id"
                :items="cbofamily"
                @change="selectedFamily"
                >
              </v-select>
            </v-col>
            <v-col cols="6" md="6">
              <v-select
                v-model="ModelSubFamily"
                :rules="[(v) => !!v || 'Debe Seleccionar una Sub-Categoria es Requerida']"
                dense
                clearable
                label="Sub-Categoria"
                item-text="desc_sufa"
                item-value="id"
                :items="cbosubfamily"
                >
              </v-select>
            </v-col>
          </v-row>
        <v-container>

        </v-container>

        <v-list-item-title class="text-h7 mb-2">
          <v-select
            v-model="ModelIva"
            :rules="[(v) => !!v || 'Debe Seleccionar un Valor IVA es Requerida']"
            dense
            clearable
            label="IVA"
            item-text="desc_ivag"
            item-value="id"
            :items="cboIva"
            @change="DropDownIva">
          </v-select>
        </v-list-item-title>
        
         <v-list-item-title class="text-h7 mb-1">
          <template>
            <v-carousel>
              <v-carousel-item
                v-for="(item,i) in ModelArrayImages"
                :key="i"
                :src="item.image"
                reverse-transition="fade-transition"
                transition="fade-transition"
                contain
              ></v-carousel-item>
            </v-carousel>
          </template>
        </v-list-item-title>

      </v-list-item-content>
    </v-list-item>

    
      <v-card-actions class="mb-3">
        
        <v-btn color="primary" dark class="ml-auto ma-3" @click="saveArticle">
            Actualizar 
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

      <v-snackbar 
        v-model="snackbarDue"
        color="red darken-3" 
        absolute 
        :vertical="vertical">
          {{ text_message }}
          <template v-slot:action="{ attrs }">
            <v-btn
              text
              v-bind="attrs"
              @click="warning"
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
  import SubFamilyDataService from "../../services/SubFamilyDataService";
  import ArticleDataService from "../../services/ArticleDataService";
  import IvaDataService from '../../services/IvaDataService';
  import presentationDataService from '@/services/presentationDataService';

  export default {
    mixins: [validationMixin],
    validations: {
      description: { required, maxLength: maxLength(200) },
      abbreviation:{ maxLength :maxLength(3)},
    },

    data:() =>({
      ModelArticle: null,
      snackbar:false,
      snackbarDue:false,
      text_message :'',
      Modeldescription:'',
      txtabbreviation:'',
      ModelId:'',
      ModelCodebar:'',
      ModelCode:'',
      ModelMinimumAmount:1,
      ModelMaximumAmount:9999999,
      optgroups: false,
      ModelArrayImages:[],
      ModelFamily:'',
      ModelSubFamily:'',
      ModelIva:'',
      ModelPresentationSale:'',
      ModelPresentationPurchase:'',
      ModelCapacitySale:'',
      ModelCapacityPurchase:'',
      ModelExempt:'',
      ModelProceeds:'',
      maxLengthDescription:200,
      maxLengthAbbreviation:3,
      maxLengthCode:15,
      maxLengthCodeBar:30,
      search_family: [],
      dialog: false,
      vertical: true,
      arrayImages:new Array(),
      cbofamily : [],
      cbosubfamily : [],
      cboIva: [],
      cboPresentation: [],
      ModelPorc1: "1.00",
      ModelPorc2: "1.00",
      ModelPorc3: "1.00",
      ModelPrecArti: "1,00",
      label_preca: "Precio",
      placeholder_preca: "Precio",
      label_porc1: "Porcentaje 1",
      placeholder_porc1: "Porcentaje 1",
      label_porc2: "Porcentaje 2",
      placeholder_porc2: "Porcentaje 2",
      label_porc3: "Porcentaje 3",
      placeholder_porc3: "Porcentaje 3",
      valueWhenIsEmpty: "",
      options: {
        locale: "en-US",
        prefix: "$",
        suffix: "",
        length: 11,
        precision: 2
      },
      properties: {
        hint: "Ingrese el Valor"
      },
      items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],

    }),
    mounted(){
      this.getArticle(this.$route.params.id);
      this.DropDownFamily();
      this.DropDownIva();
      this.DropDownPresentation();
      this.$nextTick(() =>{
        setTimeout(() =>{
          this.focusInput();
        })
      })
    },
    methods:{
      focusInput(){
        this.$refs.txtcode.$refs.input.focus();
      },
      clear () {
        this.ModelId = ''
        this.ModelCode = ''
        this.Modeldescription = ''
        this.ModelCodebar = ''
        this.ModelMinimumAmount = ''
        this.ModelMaximumAmount = ''
        this.ModelPrecArti = ''
        this.ModelPorc1 = ''
        this.ModelPorc2 = ''
        this.ModelPorc3 = ''
        this.ModelPresentationSale = ''
        this.ModelCapacitySale = ''
        this.ModelPresentationPurchase = ''
        this.ModelCapacityPurchase = ''
        this.ModelSubFamily = ''
        this.ModelIva = ''
        this.ModelExempt =''
        this.ModelProceeds =''
      },
      valid_form(){
        if(this.ModelCode.length<5){
          return false;
        }
        if(this.Modeldescription.length<4){
          return false;
        }

          return true;
      },
      restore(){
        this.snackbar=false;
        this.$router.push('/article');
      },
      warning(){
        this.snackbarDue=false;
      },
      // Method Save
      saveArticle() {
        if(this.valid_form()==false){
          this.text_message ="No se Puede Guardar, algunos campos son Necesarios o Requeridos"
          this.snackbarDue = true;
          return false;
        }
        const data_updated = {
          codi_arti : this.ModelCode,
          idae_arti : this.ModelCode,
          desc_arti : this.Modeldescription,
          coba_arti : this.ModelCodebar,
          cmin_arti : this.ModelMinimumAmount,
          cmax_arti : this.ModelMaximumAmount,
          por1_arti : this.ModelPorc1,
          por2_arti : this.ModelPorc2,
          por3_arti : this.ModelPorc3,
          ppre_arti : this.ModelPrecArti,
          exgr_arti : this.ModelExempt == true ? "E": "G",
          codc_pres : this.ModelPresentationPurchase,
          capc_arti : this.ModelCapacityPurchase,
          codv_pres : this.ModelPresentationSale,
          capv_arti : this.ModelCapacitySale,
          proc_arti : this.ModelProceeds == true ? "X": "M",
          codi_sufa : this.ModelSubFamily,
          codi_ivti : this.ModelIva,
        };
        
        ArticleDataService.update(this.ModelId,data_updated)
        .then((response) => {
          this.text_message ="Datos Actualizados Exitosamente:"+response;
          this.snackbar = true;
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
            this.cbofamily = response.data.map(this.getDisplayFamily);
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

      selectedFamily(selectObj){
        this.DropDownSubFamily(selectObj);
      },

      /**
       * DropDown Sub Family
       */
      DropDownSubFamily(ObjectArticle) {
          SubFamilyDataService.dropdown(ObjectArticle.family)
          .then((response) => {            
            this.ModelSubFamily = ObjectArticle.codi_sufa;
            this.cbosubfamily = response.data.map(this.getDisplaySubFamily);
          })
          .catch((e) => {
            console.log(e);
          });
      },

      getDisplaySubFamily(subfamily){
        return {
          id : subfamily.id,
          desc_sufa : subfamily.desc_sufa,
        }
      },

      /**
       * DropDown Iva
       */
      DropDownIva() {
          IvaDataService.dropdown()
          .then((response) => {
            this.cboIva = response.data.map(this.getDisplayIva);
          })
          .catch((e) => {
            console.log(e);
          });
      },

      getDisplayIva(iva){
        return {
          id : iva.id,
          desc_ivag : iva.desc_ivag,
        }
      },


      /**
       * DropDown Presentation
       */
      DropDownPresentation() {
          presentationDataService.dropdown()
          .then((response) => {
            this.cboPresentation = response.data.map(this.getDisplayPresentation);
          })
          .catch((e) => {
            console.log(e);
          });
      },

      getDisplayPresentation(presentation){
        return {
          id : presentation.id,
          desc_pres : presentation.desc_pres,
        }
      },

      /**
       * Search Article
       * @param {*} id 
       */
      getArticle(id){
        ArticleDataService.get(id)
        .then(response => {
          //console.log(response.data.data);
          this.ModelArticle = response.data.data;
          //console.log(this.ModelArticle);
          this.ModelId                    = this.ModelArticle.id;
          this.ModelCode                  = this.ModelArticle.codi_arti;
          this.Modeldescription           = this.ModelArticle.desc_arti;
          this.ModelCodebar               = this.ModelArticle.coba_arti;
          this.ModelMinimumAmount         = this.ModelArticle.cmin_arti;
          this.ModelMaximumAmount         = this.ModelArticle.cmax_arti;
          this.ModelPrecArti              = this.ModelArticle.ppre_arti;
          this.ModelPorc1                 = this.ModelArticle.por1_arti;
          this.ModelPorc2                 = this.ModelArticle.por2_arti;
          this.ModelPorc3                 = this.ModelArticle.por3_arti;
          this.ModelPresentationSale      = this.ModelArticle.codv_pres;
          this.ModelCapacitySale          = this.ModelArticle.capv_arti;
          this.ModelPresentationPurchase  = this.ModelArticle.codc_pres;
          this.ModelCapacityPurchase      = this.ModelArticle.capc_arti;
          this.ModelExempt                = this.ModelArticle.exgr_arti == "E" ? true: false;
          this.ModelProceeds              = this.ModelArticle.proc_arti == "X" ? true: false;
          //this.ModelSubFamily             = this.ModelArticle.codi_sufa
          this.selectedFamily(this.ModelArticle);
          //this.DropDownSubFamily(this.ModelArticle.codi_sufa);
          this.ModelFamily                = this.ModelArticle.family;
          this.ModelIva                   = this.ModelArticle.codi_ivti;
          this.ModelArrayImages           = this.ModelArticle.foto_arti;
        })
        .catch(e => {
          console.log(e);
        });
      },

    }
  }
</script>