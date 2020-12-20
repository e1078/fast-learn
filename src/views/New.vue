<template>
  <div>
    <v-app-bar color="white" flat>
      <v-btn icon color="black" @click="back">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="6" sm="8" xs="12">
          <v-card>
            <v-card-title>
              Ajouter une liste
              <v-spacer v-if="step == 2"></v-spacer>
              <v-btn
                class="align-center"
                text
                @click="words.push({})"
                color="primary"
                v-if="step == 2"
              >
                <v-icon>mdi-plus</v-icon> Ajouter un mot
              </v-btn>
            </v-card-title>
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-card-text>
                  <v-text-field
                    label="Titre"
                    v-model="title"
                    clearable
                  ></v-text-field>
                  <v-text-field
                    label="Sous-titre"
                    v-model="subtitle"
                    clearable
                  ></v-text-field>
                </v-card-text>
              </v-window-item>
              <v-window-item :value="2">
                <v-card-text>
                  <v-row>
                    <v-col
                      cols="12"
                      v-for="(word, index) in words"
                      :key="index"
                    >
                      <v-card>
                        <v-card-title>
                          Mot {{ index + 1 }}
                          <v-spacer></v-spacer>
                          <v-btn
                            icon
                            color="black"
                            @click="words.splice(index, 1)"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-card-title>
                        <v-card-text>
                          <v-text-field
                            :label="wordText"
                            v-model="word[0]"
                            clearable
                          ></v-text-field>
                          <v-text-field
                            :label="translateText"
                            v-model="word[1]"
                            clearable
                          ></v-text-field>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-window-item>
            </v-window>
            <v-card-actions>
              <v-btn :disabled="step === 1" text color="primary" @click="step--"
                >Retour</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn v-if="step == 1" depressed color="primary" @click="step++"
                >Suivant</v-btn
              ><v-btn v-else depressed color="primary" @click="addList"
                >Terminer</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  name: "New",
  data: () => ({
    step: 1,
    title: "",
    subtitle: "",
    words: [{}],
    wordText: "Français",
    translateText: "Allemand"
  }),
  methods: {
    addList() {
      const list = {
        id: uuidv4(),
        title: this.title,
        subtitle: this.subtitle,
        0: this.wordText,
        1: this.translateText,
        words: this.words
      };
      this.$store.dispatch("addList", list);
      this.back();
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
