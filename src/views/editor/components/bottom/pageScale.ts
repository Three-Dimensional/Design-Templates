import { onUnmounted, onMounted, reactive, ref, Ref } from 'vue'

declare type Nullable<T> = T | null
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
const pageScale = () => {
  const previewRef: Ref<ElRef> = ref(null)
  const canvasRef: Ref<ElRef> = ref(null)
  const previewStyle = reactive({
    transform: 'matrix(0.9,0,0,0.9,0,0)',
    transformOrigin: '0px 0px',
    preWidth: 0,
    preHeight: 0
  })

  const scaleRate = ref(0.9)
  /**
   * 逻辑 画布容器  短边 - 140 计算出画布大小。
   *  根据大小算缩放比例/  算缩x/y放偏移量
   */
  // const setOriginScale = () => {
  //   // 画布容器实际大小
  //   previewStyle.preWidth = previewRef.value!.clientWidth
  //   previewStyle.preHeight = previewRef.value!.clientHeight
  //   // 比例 用于比较长短边
  //   const preWidthRate = previewStyle.preWidth / canvasOriginSize.width
  //   const preHeightRate = previewStyle.preHeight / canvasOriginSize.height

  //   if (preWidthRate <= preHeightRate) {
  //     scaleRate.value = (previewStyle.preWidth - 140) / canvasOriginSize.width
  //   } else {
  //     scaleRate.value = (previewStyle.preHeight - 140) / canvasOriginSize.height
  //   }

  //   // x y 轴偏移
  //   canvas.offsetX = (previewStyle.preWidth - canvasOriginSize.width * scaleRate.value) / 2
  //   canvas.offsetY = (previewStyle.preHeight - canvasOriginSize.height * scaleRate.value) / 2

  //   previewStyle.transform = `matrix(${scaleRate.value},0,0,${scaleRate.value},0,0)`
  // }

  const changeScaleRate = (type: 'add' | 'subtract') => {
    console.log(type)
    if (type === 'add') {
      scaleRate.value += 0.04
    } else {
      scaleRate.value -= 0.04
    }
    previewStyle.transform = `matrix(${scaleRate.value},0,0,${scaleRate.value}, 0, 0)`
  }

  const setWheelScale = (ev: any) => {
    console.log(ev)
    let down = true
    down = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0
    if (down) {
      // 向下
      if (scaleRate.value <= 0.3) {
        return
      }
      changeScaleRate('subtract')
    } else {
      if (scaleRate.value >= 4.0) {
        return
      }
      changeScaleRate('add')
    }
  }

  onMounted(() => {
    // setOriginScale()
    previewRef.value!.addEventListener('mousewheel', setWheelScale, { passive: true })
  })

  onUnmounted(() => {
    previewRef.value!.removeEventListener('mousewheel', setWheelScale)
  })

  return {
    previewStyle,
    previewRef,
    canvasRef,
    scaleRate,
    changeScaleRate
  }
}

export default pageScale
