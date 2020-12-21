<template>
  <div class="fill-height">
    <v-app-bar color="white" flat>
      <v-btn icon color="black" @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container fill-height>
      <v-row justify="center">
        <v-col cols="12" v-if="list != null">
          <v-card>
            <v-card-title>{{ list.title }}</v-card-title>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        {{ list[0] }}
                      </th>
                      <th class="text-left">
                        {{ list[1] }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(word, index) in list.words" :key="index">
                      <td>{{ word[0] }}</td>
                      <td>{{ word[1] }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "List",
  props: ["practiseId"],
  computed: {
    list() {
      return this.$store.state.lists.find(list => list.id == this.practiseId);
    }
  }
};
</script>
