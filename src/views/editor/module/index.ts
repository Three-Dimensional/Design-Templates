const modulesFiles = import.meta.glob('./**/*.vue', {
  import: 'default',
  eager: true
})
console.log(modulesFiles)
const path = Object.keys(modulesFiles)
const modules = {}
path.forEach((item) => {
  const url = item.replace('.', '')
  const key = url.replace(/(.*\/)*([^.]+).*/gi, '$2')
  const filePath = url.replace(/(.*\/)*([^.]+).*/gi, '$1')
  const file = filePath.split('/')
  const moduleName = `${file[1]}-${key}`
  modules[moduleName] = modulesFiles[item]
})
export default modules
