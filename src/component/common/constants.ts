import RECTANGLE from '@/assets/avatars/RECTANGLE.png'
import SMALL_INVERTED_TRIANGLE from '@/assets/avatars/SMALL_INVERTED_TRIANGLE.png'
import LARGE_TRIANGLE from '@/assets/avatars/LARGE_TRIANGLE.png'

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
  { id: 'name', label: '이름', type: 'text', editable: true },
  { id: 'gender', label: '성별', type: 'text', editable: false },
  { id: 'nickName', label: '별명', type: 'text', editable: true },
  { id: 'age', label: '나이', type: 'number', editable: true },
  { id: 'height', label: '키', type: 'number', editable: true },
  { id: 'weight', label: '몸무게', type: 'number', editable: true },
  { id: 'bodyType', label: '체형', type: 'text', editable: false },
  { id: 'phoneNumber', label: '전화번호', type: 'text', editable: true },
  { id: 'email', label: '이메일', type: 'text', editable: true },
] as const
