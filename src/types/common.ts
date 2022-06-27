// 转化 T 中筛选出某个集合 K 中的属性作为必填
export type PickObjWithRequired<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: T[P]
}

// 编辑框需要的属性
export type EditBoxProps = 'width' | 'height' | 'transform'
