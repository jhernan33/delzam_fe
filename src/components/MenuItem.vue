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
        v-for="([title, icon, to], i) in files"
        :key="i"
        link
      >
        <v-list-item link router :to="to">
          <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          
          <v-list-item-title v-text="title"></v-list-item-title>
        </v-list-item>
      </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      files: [
        ['Familia',     'mdi-human-male-male','/Family'],
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