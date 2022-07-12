const modulesFiles = import.meta.globEager('./**/*.vue')
const path = Object.keys(modulesFiles)
const modules = {}
path.forEach((item) => {
  const url = item.replace('.', '')
  const key = url.replace(/(.*\/)*([^.]+).*/gi, '$2')
  const filePath = url.replace(/(.*\/)*([^.]+).*/gi, '$1')
  const file = filePath.split('/')
  const moduleName = `${file[1]}-${key}`
  modules[moduleName] = modulesFiles[item].default
})
export default modules
