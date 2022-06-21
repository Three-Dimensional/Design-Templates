import { mapValues, without } from 'lodash-es'

interface DefaultPropsType {
  [key: string]: {
    props: object
    extraProps?: { [key: string]: any }
  }
}
export interface CommonComponentProps {
  // actions
  actionType: string
  url: string
  // size
  height: string
  width: string
  paddingLeft: string
  paddingRight: string
  paddingTop: string
  paddingBottom: string
  // border type
  borderStyle: string
  borderColor: string
  borderWidth: string
  borderRadius: string
  // shadow and opacity
  boxShadow: string
  opacity: string
  // position and x,y
  position: string
  left: string
  top: string
  right: string
}

export const commonDefaultProps: CommonComponentProps = {
  // actions
  actionType: '',
  url: '',
  // size
  height: '',
  width: '318px',
  paddingLeft: '0px',
  paddingRight: '0px',
  paddingTop: '0px',
  paddingBottom: '0px',
  // border type
  borderStyle: 'none',
  borderColor: '#000',
  borderWidth: '0',
  borderRadius: '0',
  // shadow and opacity
  boxShadow: '0 0 0 #000000',
  opacity: '1',
  // position and x,y
  position: 'absolute',
  left: '0',
  top: '0',
  right: '0'
}

export interface TextComponentProps extends CommonComponentProps {
  text: string
  fontSize: string
  fontFamily: string
  fontWeight: string
  fontStyle: string
  textDecoration: string
  lineHeight: string
  textAlign: string
  color: string
  backgroundColor: string
}

export const textDefaultProps: TextComponentProps = {
  text: '正文内容',
  fontSize: '14px',
  fontFamily: '',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  lineHeight: '1',
  textAlign: 'left',
  color: '#000000',
  backgroundColor: '',
  ...commonDefaultProps
}

export const imageDefaultProps = {
  imageSrc: '',
  ...commonDefaultProps
}

// this contains all default props for all the components
// useful for inserting new component into the store
export const componentsDefaultProps: DefaultPropsType = {
  'l-text': {
    props: {
      ...textDefaultProps,
      width: '125px',
      height: '36px'
    }
  },
  'l-image': {
    props: {
      ...imageDefaultProps
    }
  },
  'l-shape': {
    props: {
      backgroundColor: '',
      ...commonDefaultProps
    }
  }
}

const withoutKeys = ['actionType', 'url', 'text']
export const textStylePropNames = without(Object.keys(textDefaultProps), ...withoutKeys)

export const transformToComponentProps = (props: TextComponentProps) => {
  return mapValues(props, (item) => {
    return {
      type: item.constructor as StringConstructor,
      default: item
    }
  })
}
