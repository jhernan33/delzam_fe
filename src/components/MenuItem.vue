<!-- <template>
  <v-card
    height="400"
    width="256"
    class="mx-auto"
  >
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            WebSite DelZam
          </v-list-item-title>
          <v-list-item-subtitle>
            Mayorista
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  export default {
    // name: 'MenuItem',
    data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Archivo', icon: 'mdi-image' },
          { title: 'Proceso', icon: 'mdi-help-box' },
        ],
        right: null,
      }
    },
  }
</script> -->

<template>
  <v-card
    class="mx-auto"
    width="300"
  >
    <v-list>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-title>Principal</v-list-item-title>
      </v-list-item>

      <v-list-group
        :value="true"
        prepend-icon="mdi-account-circle"
      >

      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>Archivo</v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item
        v-for="([title, icon], i) in files"
        :key="i"
        link
      >
      <v-list-item-icon>
          <v-icon v-text="icon"></v-icon>
        </v-list-item-icon>
      
      <v-list-item-title v-text="title"></v-list-item-title>
      
      </v-list-item>
        
        
        <!-- <v-list-item>Familia</v-list-item>
        <v-list-item>SubFamilia</v-list-item>
        <v-list-item>Productos</v-list-item> -->
        <!-- <v-list-group
          :value="true"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Familia</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon], i) in admins"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group> -->

        <!-- <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Actions</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group> -->
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      files: [
        ['Familia',     'mdi-human-male-male','/family'],
        ['SubFamilia',  'mdi-human-male-female-child','/subfamily'],
        ['Producto',    'mdi-package-variant','/product']
      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],
    }),
  }
</script>