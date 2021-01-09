<template>
  <div>
    <v-app-bar color="white" flat>
      <v-img
        v-if="$vuetify.breakpoint.smAndUp"
        :src="require('@/assets/logo.svg')"
        max-width="50"
      ></v-img>
      <v-toolbar-title class="ml-2" v-if="$vuetify.breakpoint.smAndUp">
        FastLearn
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="amber darken-3" :to="{ name: 'Test' }">
        <v-icon class="mr-1">mdi-check</v-icon> Test Ultime
      </v-btn>
      <v-btn text color="black" :to="{ name: 'New' }">
        <v-icon class="mr-1">mdi-plus</v-icon> Ajouter une liste
      </v-btn>
    </v-app-bar>
    <v-container>
      <v-row justify="center">
        <v-col
          v-for="list in lists"
          :key="list.id"
          cols="12"
          md="4"
          sm="6"
          xs="12"
        >
          <v-card>
            <v-card-title>{{ list.title }}</v-card-title>
            <v-card-subtitle>{{ list.subtitle }}</v-card-subtitle>
            <v-card-actions>
              <v-btn
                text
                color="primary"
                :to="{ name: 'List', params: { practiseId: list.id } }"
              >
                Voir les mots
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                :to="{ name: 'Practise', params: { practiseId: list.id } }"
              >
                Faire le test
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    lists() {
      return this.$store.state.lists
    },
  },
}
</script>
