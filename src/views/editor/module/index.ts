const modulesFiles = import.meta.glob('./**/*.vue')
const path = Object.keys(modulesFiles)
const modules = {}
path.forEach((item) => {
  const url = item.replace('.', '')
  const key = url.replace(/(.*\/)*([^.]+).*/gi, '$2')
  const filePath = url.replace(/(.*\/)*([^.]+).*/gi, '$1')
  const file = filePath.split('/')
  const moduleName = `${file[1]}-${key}`
  console.log(
    '%c 🥓 modulesFiles: ',
    'font-size:20px;background-color: #6EC1C2;color:#fff;',
    modulesFiles
  )
  modules[moduleName] = modulesFiles[item]
})
export default modules
