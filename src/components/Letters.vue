<template>
  <v-row justify="space-around">
    <v-btn
      text
      @click="$emit('click', 'ß')"
      style="text-transform: none !important;"
      >ß</v-btn
    >
    <v-btn
      text
      @click="$emit('click', 'ä')"
      style="text-transform: none !important;"
      >ä</v-btn
    >
    <v-btn
      text
      @click="$emit('click', 'ö')"
      style="text-transform: none !important;"
      >ö</v-btn
    >
    <v-btn
      text
      @click="$emit('click', 'ü')"
      style="text-transform: none !important;"
      >ü</v-btn
    >
  </v-row>
</template>

<script>
export default {
  name: 'Letters',
}
</script>
