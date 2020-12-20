<template>
  <div class="fill-height">
    <v-app-bar color="white" flat fixed>
      <v-btn icon color="black" @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container fill-height>
      <v-row justify="center">
        <v-col cols="12" md="6" sm="8" xs="12">
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
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-card-text class="pb-0">
                  <v-text-field
                    outlined
                    :label="words[currentWord][wordIndex]"
                    clearable
                    @click:clear="input = ''"
                    v-model="input"
                  ></v-text-field>
                </v-card-text>
              </v-window-item>
              <v-window-item :value="2">
                <v-card-text>
                  <v-alert type="success" text v-if="correct"
                    >Bien joué !
                  </v-alert>
                  <v-alert type="error" text v-else
                    >La réponsé était
                    <strong class="font-weight-black">{{
                      words[currentWord][translateIndex]
                    }}</strong></v-alert
                  >
                </v-card-text>
              </v-window-item>
              <v-window-item :value="3">
                <v-card-text class="text-center">
                  <div class="headline">
                    {{ (correctCount / words.length) * 20 }} / 20
                  </div>
                  <div>
                    Tu as
                    <strong class="red--text font-weight-black body-2">{{
                      words.length - correctCount
                    }}</strong>
                    erreurs et
                    <strong class="green--text font-weight-black body-2">{{
                      correctCount
                    }}</strong>
                    bonnes réponses
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
                  v-if="currentWord + 1 != words.length"
                  >Suivant</v-btn
                >
                <v-btn text color="primary" @click="step = 3" v-else
                  >Terminer</v-btn
                >
              </div>
            </v-card-actions>
          </v-card>
          <div class="mt-16 mx-4">
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
export default {
  name: "Practise",
  data: () => ({
    step: 1,
    currentWord: 0,
    answersCount: 0,
    input: "",
    wordIndex: 0,
    translateIndex: 1,
    correct: null,
    correctCount: 0
  }),
  props: ["practiseId"],
  computed: {
    list() {
      return this.$store.state.lists.find(list => list.id == this.practiseId);
    },
    words() {
      var array = this.list.words;
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
  },
  methods: {
    showCorrection() {
      this.correct =
        this.input.trim() ==
        this.words[this.currentWord][this.translateIndex].trim();
      if (this.correct) {
        this.correctCount++;
      }
      this.step = 2;
      this.answersCount++;
    },
    nextWord() {
      this.step = 0;
      this.input = "";
      this.correct = null;
      this.currentWord++;
    },
    resetTest() {
      this.step = 0;
      this.input = "";
      this.currentWord = 0;
      this.correctCount = 0;
      this.answersCount = 0;
    },
    swap() {
      [this.wordIndex, this.translateIndex] = [
        this.translateIndex,
        this.wordIndex
      ];
    }
  }
};
</script>
