import { onUnmounted, onMounted, reactive, ref, Ref } from 'vue'

declare type Nullable<T> = T | null
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
const pageScale = () => {
  const previewRef: Ref<ElRef> = ref(null)
  const canvasRef: Ref<ElRef> = ref(null)
  const previewStyle = reactive({
    transform: 'matrix(1,0,0,1,0,0)',
    transformOrigin: '0px 0px',
    preWidth: 0,
    preHeight: 0
  })

  const canvasOriginSize = reactive({
    width: 1080,
    height: 1920
  })

  const canvas = reactive({
    width: 0,
    height: 0,
    scaleRate: 0,
    offsetX: 0,
    offsetY: 0
  })
  /**
   * 逻辑 画布容器  短边 - 140 计算出画布大小。
   *  根据大小算缩放比例/  算缩x/y放偏移量
   */
  const setOriginScale = () => {
    // 画布容器实际大小
    previewStyle.preWidth = previewRef.value!.clientWidth
    previewStyle.preHeight = previewRef.value!.clientHeight
    // 比例 用于比较长短边
    const preWidthRate = previewStyle.preWidth / canvasOriginSize.width
    const preHeightRate = previewStyle.preHeight / canvasOriginSize.height

    if (preWidthRate <= preHeightRate) {
      canvas.scaleRate = (previewStyle.preWidth - 140) / canvasOriginSize.width
    } else {
      canvas.scaleRate = (previewStyle.preHeight - 140) / canvasOriginSize.height
    }

    // x y 轴偏移
    canvas.offsetX = (previewStyle.preWidth - canvasOriginSize.width * canvas.scaleRate) / 2
    canvas.offsetY = (previewStyle.preHeight - canvasOriginSize.height * canvas.scaleRate) / 2

    previewStyle.transform = `matrix(${canvas.scaleRate},0,0,${canvas.scaleRate},${canvas.offsetX}, ${canvas.offsetY})`
  }

  const setWheelScale = (ev: any) => {
    let down = true
    down = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0
    if (down) {
      // 向下
      canvas.scaleRate += 0.03
      canvas.offsetX = (previewStyle.preWidth - canvasOriginSize.width * canvas.scaleRate) / 2
      canvas.offsetY = (previewStyle.preHeight - canvasOriginSize.height * canvas.scaleRate) / 2
      previewStyle.transform = `matrix(${canvas.scaleRate},0,0,${canvas.scaleRate},${canvas.offsetX}, ${canvas.offsetY})`
    } else {
      if (canvas.scaleRate === 0.1) {
        return
      }
      canvas.scaleRate -= 0.03
      canvas.offsetX = (previewStyle.preWidth - canvasOriginSize.width * canvas.scaleRate) / 2
      canvas.offsetY = (previewStyle.preHeight - canvasOriginSize.height * canvas.scaleRate) / 2
      previewStyle.transform = `matrix(${canvas.scaleRate},0,0,${canvas.scaleRate},${canvas.offsetX}, ${canvas.offsetY})`
    }
    if (ev.preventDefault) {
      // ev.preventDefault()
    }
  }

  onMounted(() => {
    setOriginScale()
    previewRef.value!.addEventListener('mousewheel', setWheelScale, { passive: true })
  })

  onUnmounted(() => {
    previewRef.value!.removeEventListener('mousewheel', setWheelScale)
  })

  return {
    previewStyle,
    previewRef,
    canvasRef
  }
}

export default pageScale
