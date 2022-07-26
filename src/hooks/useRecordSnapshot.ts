import { reactive } from 'vue'
import useEditorStore from '@/stores/editor'

const store = useEditorStore()

// 快照数据对象
interface snapshotType {
  snapshotData: any[]
  snapshotIndex: number
}
export const snapshot: snapshotType = reactive({
  snapshotData: [], // 编辑器快照数据
  snapshotIndex: -1 // 快照索引
})

// 记录操作步骤
export const recordSnapshot = (state: any) => {
  // 在 back 过程中，添加新的快照时，将它后面的快照清理掉
  if (snapshot.snapshotIndex !== snapshot.snapshotData.length - 1) {
    snapshot.snapshotData = snapshot.snapshotData.slice(0, snapshot.snapshotIndex + 1)
  }
  snapshot.snapshotIndex += 1
  snapshot.snapshotData.push(JSON.parse(JSON.stringify(state)))
}

// 回退撤销
export const forward = () => {
  snapshot.snapshotIndex += 1
  store.handleChange(snapshot.snapshotData[snapshot.snapshotIndex])
}

// 撤销
export const back = () => {
  snapshot.snapshotIndex -= 1
  store.handleChange(snapshot.snapshotData[snapshot.snapshotIndex])
}
// 初始化面板数据
recordSnapshot(store)
