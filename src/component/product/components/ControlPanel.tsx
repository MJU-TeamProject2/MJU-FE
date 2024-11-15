import React from 'react'
import { SelectionButton } from './SelectionButton'
import { GenderType, SizeType, HeightType } from '../types'
import { sizeScales, heightScales } from '../constants/scales'

interface ControlPanelProps {
  gender: GenderType
  size: SizeType
  height: HeightType
  onGenderChange: (gender: GenderType) => void
  onSizeChange: (size: SizeType) => void
  onHeightChange: (height: HeightType) => void
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  gender,
  size,
  height,
  onGenderChange,
  onSizeChange,
  onHeightChange,
}) => (
  <div style={{ padding: '40px', backgroundColor: '#fff', width: '50%' }}>
    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '40px' }}>
      원하는 아바타를 피팅해보세요
    </h2>

    <div style={{ marginBottom: '30px' }}>
      <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>성별 선택</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <SelectionButton
          selected={gender === '남자'}
          onClick={() => onGenderChange('남자')}
        >
          남자
        </SelectionButton>
        <SelectionButton
          selected={gender === '여자'}
          onClick={() => onGenderChange('여자')}
        >
          여자
        </SelectionButton>
      </div>
    </div>

    <div style={{ marginBottom: '30px' }}>
      <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>사이즈 선택</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        {(Object.keys(sizeScales) as SizeType[]).map((s) => (
          <SelectionButton
            key={s}
            selected={size === s}
            onClick={() => onSizeChange(s)}
          >
            {s}
          </SelectionButton>
        ))}
      </div>
    </div>

    <div>
      <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>모델키 선택</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        {(Object.keys(heightScales) as HeightType[]).map((h) => (
          <SelectionButton
            key={h}
            selected={height === h}
            onClick={() => onHeightChange(h)}
          >
            {h}
          </SelectionButton>
        ))}
      </div>
    </div>
  </div>
)
