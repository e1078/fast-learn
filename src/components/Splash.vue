<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <div>
        <svg
          svg
          width="550"
          height="550"
          viewBox="0 0 550 550"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#35616A"
            style="animation: anim1 2s cubic-bezier(0.8, 0, 0.2, 1.2) forwards"
          />
          <path
            fill="#35616A"
            style="animation: anim2 2s cubic-bezier(0.8, 0, 0.2, 1.2) forwards"
          />
          <path
            fill="#35616A"
            style="animation: anim3 2s cubic-bezier(0.8, 0, 0.2, 1.2) forwards"
          />
          <path
            fill="#35616A"
            style="animation: anim4 2s cubic-bezier(0.8, 0, 0.2, 1.2) forwards"
          />
        </svg>
        <div class="display-2 text-center mt-4 text--secondary">FastLearn</div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Splash"
};
</script>

<style>
path {
  transform-origin: center center;
}

@keyframes anim1 {
  0% {
    d: path("M274.5 20L315.636 91.25H233.364L274.5 20Z");
  }
  100% {
    d: path("M274.5 187L315.636 258.25H233.364L274.5 187Z");
    transform: scale(2, 2);
  }
}

@keyframes anim2 {
  0% {
    d: path("M477.5 322L436.364 250.75H518.636L477.5 322Z");
  }
  100% {
    d: path("M327.5 339L286.364 267.75H368.636L327.5 339Z");
    transform: scale(2, 2);
  }
}

@keyframes anim3 {
  0% {
    d: path("M72.5 322L31.3638 250.75H113.636L72.5 322Z");
  }
  100% {
    d: path("M222.5 339L181.364 267.75H263.636L222.5 339Z");
    transform: scale(2, 2);
  }
}

@keyframes anim4 {
  0% {
    d: path("M274.5 401L315.636 472.25H233.364L274.5 401Z");
  }
  100% {
    d: path("M274.5 268L315.636 339.25H233.364L274.5 268Z");
    transform: scale(2, 2);
  }
}
</style>
