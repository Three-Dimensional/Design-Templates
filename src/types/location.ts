// 位置对象属性
export interface ComputedPosition {
  width: number
  height: number
  left: number
  top: number
}

// 附带矩阵计算结果的位置对象属性
export interface MatrixComputedPosition extends ComputedPosition {
  matrix: Array<number>
}

// 点位
export interface ComputedPoint {
  x: number
  y: number
}
