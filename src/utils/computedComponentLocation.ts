// 计算组件位置函数，提供给editBox调用，拖动点会改变width、height、left、top
import type { ComputedPoint, ComputedPosition } from '@/types/location'

/**
 * 获取两点的中心点坐标
 * @param p1
 * @param p2
 * @returns ComputedPoint
 */
function getCenterPoint(p1: ComputedPoint, p2: ComputedPoint) {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2
  }
}

/**
 *坐标旋转映射点
 * @param curPoint 当前点
 * @param center 中心点
 * @param rotate 旋转角度
 * http://t.zoukankan.com/wxl845235800-p-9600606.html
 * 假设对图片上任意点(x,y)，绕一个坐标点(rx0,ry0)逆时针旋转a角度后的新的坐标设为(x0, y0)，有公式：
 * x0= (x - rx0)*cos(a) - (y - ry0)*sin(a) + rx0 ;
 * y0= (x - rx0)*sin(a) + (y - ry0)*cos(a) + ry0 ;
 */
function CoordinateRotateMappingPoint(point: ComputedPoint, center: ComputedPoint, rotate: number) {
  return {
    x:
      (point.x - center.x) * Math.cos(rotate * (Math.PI / 180)) -
      (point.y - center.y) * Math.sin(rotate * (Math.PI / 180)) +
      center.x,
    y:
      (point.x - center.x) * Math.sin(rotate * (Math.PI / 180)) +
      (point.y - center.y) * Math.cos(rotate * (Math.PI / 180)) +
      center.y
  }
}

/**
 * 计算左上角的点拖动的前后位置
 * @param curPoint 当前位置坐标
 * @param symmetriPoint 对称点坐标
 * @param rotate 旋转的角度
 * @returns 计算出来的位置
 */
function computedLeftTop(
  curPoint: ComputedPoint,
  symmetriPoint: ComputedPoint,
  rotate: number
): ComputedPosition {
  const newCenter = getCenterPoint(curPoint, symmetriPoint)
  //   当前点
  const point = CoordinateRotateMappingPoint(curPoint, newCenter, rotate)
  //   对称点
  const symmetry = CoordinateRotateMappingPoint(symmetriPoint, newCenter, rotate)
  return {
    width: symmetry.x - point.x,
    height: symmetriPoint.y - point.y,
    left: point.x,
    top: point.y
  }
}

// 坐标点和计算函数的对应关系
const pointFunc = {
  lt: computedLeftTop
}

export default function computedLocation(
  pointName: string,
  curPoint: ComputedPoint,
  symmetriPoint: ComputedPoint,
  rotate: number
) {
  pointFunc[pointName](curPoint, symmetriPoint, rotate)
}
