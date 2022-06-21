<template>
  <div>
    <vuetify-money
      v-model="value"
      v-bind:label="label"
      v-bind:placeholder="placeholder"
      v-bind:readonly="false"
      v-bind:disabled="false"
      v-bind:outlined="true"
      v-bind:clearable="true"
      v-bind:valueWhenIsEmpty="valueWhenIsEmpty"
      v-bind:options="options"
      v-bind:properties="properties"
    />
    Parent v-model: {{ value }}
  </div>
</template>
<script>
export default {
  data: () => ({
    value: "1234567.89",
    label: "Precio",
    placeholder: " Precio",
    // readonly: false,
    // disabled: false,
    // outlined: true,
    // clearable: true,
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
      // You can add other v-text-field properties, here.
    },
  })
};
</script>