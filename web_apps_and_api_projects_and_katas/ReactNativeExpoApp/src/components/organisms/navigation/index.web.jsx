import React from 'react'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import Container from 'components/atoms/container'

const Wrapper = styled.View`
  height: 85px;
  flex-direction: row;
  align-items: stretch;
  border-bottom-color: #e0e0e0;
  border-bottom-width: 1px;
  background-color: ${props => props.theme.bgColor};
`

const Center = styled(Container)`
  height: 100%;
`

const ThemeText = styled.Text`
  color: ${props => props.theme.textColor};
`

export default function Header() {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <Center>
        <ThemeText>{t('home:title')}</ThemeText>
      </Center>
    </Wrapper>
  )
}
