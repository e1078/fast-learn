<template>
  <div class="fill-height">
    <v-app-bar color="white" flat fixed>
      <v-btn icon color="black" @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container fill-height>
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
                <v-card-text>
                  <v-alert type="success" text v-if="correct"
                    >Bien joué !
                  </v-alert>
                  <div v-else>
                    <v-alert type="error" text
                      >La réponse était
                      <strong class="font-weight-black">{{
                        words[currentWord][translateIndex]
                      }}</strong></v-alert
                    >
                    <v-text-field
                      outlined
                      v-model="errorInput"
                      :label="words[currentWord][wordIndex]"
                    ></v-text-field>
                    <letters
                      v-if="translateIndex == 1"
                      @click="errorInput += $event"
                    ></letters>
                  </div>
                </v-card-text>
              </v-window-item>
              <v-window-item :value="3">
                <v-card-text class="text-center">
                  <div class="headline">
                    {{ words.length - actualErrors.length }} /
                    {{ words.length }}
                  </div>
                  <div>
                    Tu as
                    <strong class="red--text font-weight-black body-2">{{
                      actualErrors.length
                    }}</strong>
                    erreurs et
                    <strong class="green--text font-weight-black body-2">{{
                      words.length - actualErrors.length
                    }}</strong>
                    bonnes réponses
                  </div>
                  <div class="pt-2" v-if="actualErrors.length != 0">
                    <v-btn text color="red" @click="keepErrors"
                      >Continuer</v-btn
                    >
                  </div>
                </v-card-text>
              </v-window-item>
            </v-window>
            <v-card-actions>
              <div v-if="step == 1">
                <v-btn text color="green" @click="showCorrection"
                  >Valider</v-btn
                >
                <v-btn text color="red" @click="showCorrection">Passer</v-btn>
              </div>
              <div v-if="step == 2">
                <v-btn
                  text
                  color="primary"
                  @click="nextWord"
                  :disabled="disabled"
                  v-if="currentWord + 1 != words.length"
                  >Suivant</v-btn
                >
                <v-btn
                  text
                  color="primary"
                  @click="step = 3"
                  :disabled="disabled"
                  v-else
                  >Terminer</v-btn
                >
                <v-btn
                  text
                  color="red"
                  @click="
                    currentWord + 1 != words.length ? nextWord() : (step = 3)
                  "
                  >Passer</v-btn
                >
                <v-btn text color="amber" @click="correctError"
                  >J'ai raison</v-btn
                >
              </div>
            </v-card-actions>
          </v-card>
          <div class="mt-16 mx-6">
            <v-progress-linear
              rounded
              :value="(answersCount / words.length) * 100"
            ></v-progress-linear>
            <div class="text-center pt-3 text-caption">
              {{ answersCount }} / {{ words.length }}
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
  name: 'Practise',
  components: {
    Letters,
  },
  data: () => ({
    step: 1,
    currentWord: 0,
    answersCount: 0,
    input: '',
    errorInput: '',
    wordIndex: 0,
    translateIndex: 1,
    correct: null,
    previousErrors: [],
    actualErrors: [],
  }),
  props: ['practiseId'],
  mounted() {
    this.event = addEventListener('keyup', event => {
      if (event.key == 'Enter') {
        if (this.step == 1) {
          this.showCorrection()
        } else if (this.step == 2 && !this.disabled) {
          if (this.currentWord + 1 != this.words.length) {
            this.nextWord()
          } else {
            this.step = 3
          }
        } else if (this.step == 3 && this.actualErrors.length != 0) {
          this.keepErrors()
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
      return this.$store.state.lists.find(list => list.id == this.practiseId)
    },
    words() {
      if (this.previousErrors.length == 0) {
        return this.shuffleArray(this.list.words)
      } else {
        return this.shuffleArray(
          this.list.words.filter((e, index) =>
            this.previousErrors.includes(index)
          )
        )
      }
    },
    disabled() {
      return (
        this.errorInput.trim().toUpperCase() !=
          this.words[this.currentWord][this.translateIndex]
            .trim()
            .toUpperCase() && this.correct == false
      )
    },
  },
  methods: {
    showCorrection() {
      this.correct =
        this.input.trim().toUpperCase() ==
        this.words[this.currentWord][this.translateIndex].trim().toUpperCase()
      if (!this.correct) {
        this.actualErrors.push(
          this.list.words.indexOf(this.words[this.currentWord])
        )
      }
      this.step = 2
      this.answersCount++
    },
    nextWord() {
      this.step = 0
      this.input = ''
      this.errorInput = ''
      this.currentWord++
    },
    resetTest() {
      this.step = 0
      this.input = ''
      this.errorInput = ''
      this.currentWord = 0
      this.previousErrors = []
      this.actualErrors = []
      this.answersCount = 0
    },
    keepErrors() {
      this.step = 0
      this.input = ''
      this.errorInput = ''
      this.currentWord = 0
      this.answersCount = 0
      this.previousErrors = this.actualErrors
      this.actualErrors = []
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
    correctError() {
      this.actualErrors.pop()
      if (this.currentWord + 1 != this.words.length) {
        this.nextWord()
      } else {
        this.step = 3
      }
    },
  },
}
</script>
