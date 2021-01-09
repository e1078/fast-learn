<template>
  <div class="fill-height">
    <v-app-bar color="white" flat fixed>
      <v-btn icon color="black" @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Test Ultime</v-toolbar-title>
    </v-app-bar>
    <v-container fill-height v-if="list.words.length !== 0">
      <v-row justify="center">
        <v-col cols="12" md="6" sm="8" xs="12" v-if="list != null">
          <v-card>
            <v-card-title
              >{{ list[wordIndex] }} vers {{ list[translateIndex] }}
              <v-spacer></v-spacer>
              <v-btn color="black" icon @click="swap">
                <v-icon>mdi-swap-horizontal</v-icon>
              </v-btn>
              <v-btn color="black" icon @click="resetTest">
                <v-icon>mdi-restart</v-icon>
              </v-btn>
            </v-card-title>
            <v-window v-model="step" touchless>
              <v-window-item :value="1">
                <v-card-text class="pb-0">
                  <v-text-field
                    outlined
                    autofocus
                    :label="words[currentWord][wordIndex]"
                    v-model="input"
                  ></v-text-field>
                  <letters
                    v-if="translateIndex == 1"
                    @click="input += $event"
                  ></letters>
                </v-card-text>
              </v-window-item>
              <v-window-item :value="2">
                <v-card-text class="text-center">
                  <div class="headline">
                    {{ words.length - errors.length }} /
                    {{ words.length }}
                  </div>
                  <div>
                    Tu as
                    <strong class="red--text font-weight-black body-2">{{
                      errors.length
                    }}</strong>
                    erreurs et
                    <strong class="green--text font-weight-black body-2">{{
                      words.length - errors.length
                    }}</strong>
                    bonnes réponses
                  </div>
                </v-card-text>
              </v-window-item>
            </v-window>
            <v-card-actions>
              <div v-if="step == 1">
                <v-btn text color="green" @click="nextWord">Suivant</v-btn>
                <v-btn text color="red" @click="nextWord">Passer</v-btn>
              </div>
            </v-card-actions>
          </v-card>
          <div class="mt-16 mx-6">
            <v-progress-linear
              rounded
              :value="((currentWord + 1) / words.length) * 100"
            ></v-progress-linear>
            <div class="text-center pt-3 text-caption">
              {{ currentWord + 1 }} / {{ words.length }}
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Letters from '@/components/Letters'

export default {
  name: 'Test',
  components: {
    Letters,
  },
  data: () => ({
    step: 1,
    currentWord: 0,
    errors: [],
    input: '',
    wordIndex: 0,
    translateIndex: 1,
  }),
  props: ['practiseId'],
  mounted() {
    this.event = addEventListener('keyup', event => {
      if (event.key == 'Enter') {
        if (this.step == 1) {
          this.nextWord()
        }
      }
    })
  },
  beforeDestroy() {
    if (this.event) {
      removeEventListener(this.event)
    }
  },
  computed: {
    list() {
      let words = []
      this.$store.state.lists.forEach(list => {
        words = words.concat(list.words)
      })
      const picked = words.length >= 20 ? 20 : words.length
      const randomValues = []
      for (let i = 0; i < picked; i++) {
        randomValues.push(words[Math.floor(Math.random() * words.length)])
      }

      return {
        words: randomValues,
        '0': 'Français',
        '1': 'Allemand',
      }
    },
    words() {
      return this.shuffleArray(this.list.words)
    },
  },
  methods: {
    nextWord() {
      const correct =
        this.input.replace(/\s/g, '').toUpperCase() ==
        this.words[this.currentWord][this.translateIndex]
          .replace(/\s/g, '')
          .toUpperCase()
      if (!correct) {
        this.errors.push(this.list.words.indexOf(this.words[this.currentWord]))
      }
      this.currentWord++
      this.input = ''
      if (this.currentWord + 1 == this.words.length) {
        this.step = 2
      } else {
        this.step = 0
      }
    },
    resetTest() {
      this.input = ''
      this.errors = []
      this.currentWord = 0
      this.step = 0
    },
    swap() {
      ;[this.wordIndex, this.translateIndex] = [
        this.translateIndex,
        this.wordIndex,
      ]
    },
    shuffleArray(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }
      return array
    },
  },
}
</script>
