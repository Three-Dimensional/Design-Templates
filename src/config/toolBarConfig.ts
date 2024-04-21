type Font = {
  text: string
  value: string
}
// 字体的默认配置
export const fontFamilyArr: Font[] = [
  { text: '隶书', value: 'LiSu' },
  { text: '幼圆', value: 'Microsoft YouYuan' },
  { text: '华文楷体', value: 'STKaiti' },
  { text: '华文细黑', value: 'STXihei' },
  { text: '华文宋体', value: 'STSong' },
  { text: '华文仿宋', value: 'STFangsong' },
  { text: '微软雅黑', value: 'Microsoft YaHei' }
]

// 字号的默认配置
export const fontSize: number[] = [
  6, 8, 9, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44, 48, 54, 60, 64, 72, 80, 88, 96, 104, 120,
  144, 200, 250, 300, 350, 400, 500, 600, 700
]

// 根据字体 value 查找
export const findFamilyByvalue = (value: string) => {
  const find = fontFamilyArr.find((i) => i.value === value)
  if (!find) return ''
  return `
        <span style="font-family: ${find.value}">${find.text}</span>
    `
}
