import React from 'react'
import { TabContainer, Tab } from '@/components/styles/home.styled'

interface CategoryTabsProps {
  tabs: string[]
  activeTab: string
  onTabChange: (tab: string) => void
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => (
  <TabContainer>
    {tabs.map((tab) => (
      <Tab
        key={tab}
        active={activeTab === tab}
        onClick={() => onTabChange(tab)}
      >
        {tab}
      </Tab>
    ))}
  </TabContainer>
)
