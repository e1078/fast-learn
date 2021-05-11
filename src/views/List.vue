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
            <v-card-title
              >{{ list.title }}
              <v-spacer></v-spacer>
              <v-btn
                v-show="checked.length !== 0"
                color="primary"
                text
                @click="startTest"
                >Démarrer le test</v-btn
              >
            </v-card-title>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr v-if="type == false">
                      <th class="text-left">
                        {{ list[0] }}
                      </th>
                      <th class="text-left">
                        {{ list[1] }}
                      </th>
                      <th>Test</th>
                    </tr>
                    <tr v-else>
                      <th class="text-left">
                        {{ list[0] }}
                      </th>
                      <th v-for="(title, index) in verbTitles" :key="index">
                        {{ title }}
                      </th>
                      <th>Test</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(word, index) in words" :key="index">
                      <td v-for="(value, i) in filterWord(word)" :key="i">
                        {{ value }}
                      </td>
                      <td>
                        <v-checkbox
                          v-model="checked"
                          :value="index"
                        ></v-checkbox>
                      </td>
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
  name: 'List',
  props: ['practiseId'],
  data: () => ({
    checked: [],
  }),
  computed: {
    list() {
      return this.$store.state.lists.find(list => list.id == this.practiseId)
    },
    words() {
      var words = this.list.words
      return words
    },
    type() {
      return this.list.words
        .map(word => word.type)
        .every(value => value == this.wordTypes[1].name)
    },
    verbTitles() {
      return this.$store.state.verbTitles
    },
    wordTypes() {
      return this.$store.state.wordTypes
    },
  },
  methods: {
    startTest() {
      this.$router.push({
        name: 'Practise',
        params: { practiseId: this.practiseId, selectedWords: this.checked },
      })
    },
    filterWord(word) {
      return Object.entries(word)
        .filter(array => !array.includes('type'))
        .map(array => array[1])
    },
  },
}
</script>
