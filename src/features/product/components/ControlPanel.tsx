import React from 'react'
import { SelectionButton } from './SelectionButton'
import {
  sizeScales,
  heightScales,
  SizeType,
  HeightType,
  GenderType,
} from '@/constants/scales'
import {
  ButtonGroup,
  Container,
  ControlSection,
  Section,
  SectionTitle,
  Title,
} from '@/features/product/styles/controlPanel.styled'

export const ControlPanel: React.FC<ControlPanelProps> = ({
  gender,
  size,
  height,
  color,
  onGenderChange,
  onSizeChange,
  onHeightChange,
  onColorChange,
}) => (
  <ControlSection>
    <Container>
      <Title>원하시는 아바타를 피팅해보세요</Title>

      <Section>
        <SectionTitle>성별 선택</SectionTitle>
        <ButtonGroup>
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
        </ButtonGroup>
      </Section>
      <Section>
        <SectionTitle>색상 선택</SectionTitle>
        <ButtonGroup>
          <SelectionButton
            selected={color === '#71BFFF'}
            onClick={() => onColorChange('#71BFFF')}
          >
            스카이블루
          </SelectionButton>
          <SelectionButton
            selected={color === '#FFB6A0'}
            onClick={() => onColorChange('#FFB6A0')}
          >
            피치핑크
          </SelectionButton>
        </ButtonGroup>
      </Section>
      <Section>
        <SectionTitle>사이즈 선택</SectionTitle>
        <ButtonGroup>
          {(Object.keys(sizeScales) as SizeType[]).map((s) => (
            <SelectionButton
              key={s}
              selected={size === s}
              onClick={() => onSizeChange(s)}
            >
              {s}
            </SelectionButton>
          ))}
        </ButtonGroup>
      </Section>

      <Section $noMargin>
        <SectionTitle>모델키 선택</SectionTitle>
        <ButtonGroup>
          {(Object.keys(heightScales) as HeightType[]).map((h) => (
            <SelectionButton
              key={h}
              selected={height === h}
              onClick={() => onHeightChange(h)}
            >
              {h}
            </SelectionButton>
          ))}
        </ButtonGroup>
      </Section>
    </Container>
  </ControlSection>
)

interface ControlPanelProps {
  gender: GenderType
  size: SizeType
  height: HeightType
  color: string
  onGenderChange: (gender: GenderType) => void
  onSizeChange: (size: SizeType) => void
  onHeightChange: (height: HeightType) => void
  onColorChange: (color: string) => void
}
