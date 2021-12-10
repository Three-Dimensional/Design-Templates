<template lang="pug">
.login
  .animation
    .stars
      - for (i = 0; i < 300; i++)
        .star
          .drive.-up
            .drive.-rotate
              .drive.-radius
                .drive.-reverse
                  .drive.-angle
                    .drive.-rubber
                      .drive.-scale
                        .graphic
  .loginDialog
    input
    <a-button type="primary">登录</a-button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  name: 'home',
  components: {},
})
</script>

<style lang="scss" scoped>
.login {
  background: #222;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  perspective: 2000px;
}

.loginDialog{
  right: 10vw;
  top: 20vh;
  background: rgb(124, 124, 124);
  width: 50vh;
  height: 60vh;
  border-radius: 10px;
  position: absolute;
}



.animation {
  width: 60%;
  height: 100%;
}

.stars {
  width: 100%;
  height: 100%;
}

div {
  position: absolute;
  transform-style: preserve-3d;
}
.star {
  top: 66%;
  left: 50%;

  @for $i from 1 through 300 {
    &:nth-child(#{$i}) {
      .drive {
        $appearanceDelay: random(100000) * -1ms;
        $rotateDelay: random(100000) * -1ms;
        $radius: random(250) + 100px;

        &.-up {
          top: random(100) * -1px;
          animation-delay: $appearanceDelay;
        }

        &.-scale {
          animation-delay: $appearanceDelay;
        }

        &.-rotate,
        &.-reverse,
        &.-angle,
        &.-rubber {
          animation-delay: $rotateDelay;
        }

        &.-radius {
          transform: translateX($radius);
        }
      }

      .graphic {
        $red: random(155) + 100;
        $green: random(155) + 100;
        $blue: random(55) + 200;
        background: linear-gradient(
            0deg,
            rgba($red - 50, $green - 50, $blue - 50, 1),
            rgba(#000, 0),
            rgba(#fff, 0.8)
          ),
          rgba($red, $green, $blue, 0.7);
        // box-shadow: 0 4px 3px 0px rgba($red, $green, $blue, 0.2);
        // filter: blur(1px);
      }
    }
  }
}

.graphic {
  top: -5px;
  left: -5px;
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 100%;
}

.drive {
  &.-radius {
    transform: translateX(200px);
  }

  &.-rotate {
    animation: rotate 5000ms linear infinite;
  }

  &.-reverse {
    animation: rotate 5000ms linear infinite reverse;
  }

  &.-rubber {
    animation: rubber 1250ms cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite alternate;
  }

  &.-up {
    animation: up 20000ms linear infinite;
  }

  &.-scale {
    animation: scale 20000ms cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
  }

  &.-angle {
    animation: angle 5000ms linear infinite;
  }
}

@keyframes scale {
  0% {
    transform: scale3d(0, 0, 1);
  }

  20% {
    transform: scale3d(1, 1, 1);
  }

  80% {
    transform: scale3d(1, 1, 1);
  }

  100% {
    transform: scale3d(0, 0, 1);
  }
}

@keyframes up {
  0% {
    transform: translateY(300px);
  }

  100% {
    transform: translateY(-700px);
  }
}

@keyframes rubber {
  0% {
    transform: scaleX(1);
  }

  100% {
    transform: scaleX(5);
  }
}

@keyframes rotate {
  0% {
    transform: rotateY(0deg);
  }

  100% {
    transform: rotateY(-360deg);
  }
}

@keyframes angle {
  $angle: 10deg;

  0% {
    transform: rotateZ($angle);
  }

  49% {
    transform: rotateZ($angle);
  }

  50% {
    transform: rotateZ(-$angle);
  }

  100% {
    transform: rotateZ(-$angle);
  }
}
</style>
