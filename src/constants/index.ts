import RECTANGLE from '@/components/assets/avatars/RECTANGLE.png'
import SMALL_INVERTED_TRIANGLE from '@/components/assets/avatars/SMALL_INVERTED_TRIANGLE.png'
import LARGE_TRIANGLE from '@/components/assets/avatars/LARGE_TRIANGLE.png'

export const BODY_TYPE_AVATARS = [
  {
    id: 1,
    src: SMALL_INVERTED_TRIANGLE,
    name: '역삼각형',
    type: 'SMALL_INVERTED_TRIANGLE',
  },
  { id: 2, src: RECTANGLE, name: '직사각형', type: 'RECTANGLE' },
  { id: 3, src: LARGE_TRIANGLE, name: '사각형', type: 'LARGE_TRIANGLE' },
] as const

export const FORM_FIELDS = [
  { id: 'email', label: '이메일', type: 'text', editable: false },
  { id: 'name', label: '이름', type: 'text', editable: false },
  { id: 'gender', label: '성별', type: 'text', editable: false },
  { id: 'bodyType', label: '체형', type: 'text', editable: false },
  { id: 'nickName', label: '별명', type: 'text', editable: true },
  { id: 'age', label: '나이', type: 'number', editable: true },
  { id: 'height', label: '키', type: 'number', editable: true },
  { id: 'weight', label: '몸무게', type: 'number', editable: true },
  { id: 'phoneNumber', label: '전화번호', type: 'text', editable: true },
] as const

export const colors = {
  primary: '#767676',
  charcoalGrey: '#1e1e1e',
  darkGrey: '#555555',
  slate: '#5a5f7d',
  midnightBlue: '#1E1F30',
  deepSlate: '#212336',
  purpleGrey: '#3d3f5f',
  ghostWhite: '#f0f0f0',
  silverGrey: '#cccccc',
  skyBlue: '#347fc4',
  graphite: '#333333',
  borderGrey: '#ddd',
  paleGrey: '#d9e1e8',
  lightRed: '#ff6b6b',
  green: '#4caf50',
  deepGreen: '#45a049',
  red: 'red',
  black: 'black',
  white: 'white',
  lightBlue: 'lightblue',
  lightGrey: 'lightgray',
  blue: 'blue',
  darkRed: 'darkred',
  grey: 'gray',
}
