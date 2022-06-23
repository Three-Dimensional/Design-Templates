type Font = {
  text: string
  value: string
}
// 字体的默认配置
export const fontFamily: Font[] = [
  { text: '宋体', value: '"SimSun","STSong"' },
  { text: '黑体', value: '"SimHei","STHeiti"' },
  { text: '楷体', value: '"KaiTi","STKaiti"' },
  { text: '仿宋', value: '"FangSong","STFangsong"' }
]

// 字号的默认配置
export const fontSize: number[] = [
  6, 8, 9, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44, 48, 54, 60, 64, 72, 80, 88, 96, 104, 120,
  144, 200, 250, 300, 350, 400, 500, 600, 700, 800, 900, 1000
]

// 根据字体value查找
export const findFamilyByvalue = (value: string) => {
  const find = fontFamily.find((i) => i.value === value)
  if (!find) return ''
  return `
        <span style="font-family: ${find.value}">${find.text}</span>
    `
}
