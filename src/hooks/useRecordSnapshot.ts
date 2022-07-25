import { reactive } from 'vue'
import useEditorStore from '@/stores/editor'

const store = useEditorStore()
// 快照数据对象

interface snapshotType {
  snapshotData: any
  snapshotIndex: number
}
export const snapshot: snapshotType = reactive({
  snapshotData: [], // 编辑器快照数据
  snapshotIndex: -1 // 快照索引
})
console.log('%c 🍓 snapshot: ', 'font-size:20px;background-color: #4b4b4b;color:#fff;', snapshot)

// 记录操作步骤
export const recordSnapshot = (state: any) => {
  // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
  // if (snapshot.snapshotIndex !== snapshot.snapshotData.length - 1) {
  //   snapshot.snapshotData.splice(snapshot.snapshotIndex)
  // }
  snapshot.snapshotIndex += 1
  snapshot.snapshotData.push(JSON.parse(JSON.stringify(state)))
  console.log('%c 🥗 snapshot: ', 'font-size:20px;background-color: #2EAFB0;color:#fff;', snapshot)
}

// 回退撤销
export const forward = () => {
  snapshot.snapshotIndex += 1
  store.handleChange(snapshot.snapshotData[snapshot.snapshotIndex])
  console.log(snapshot)
}

// 撤销
export const back = () => {
  snapshot.snapshotIndex -= 1
  store.handleChange(snapshot.snapshotData[snapshot.snapshotIndex])
  console.log(snapshot)
}
