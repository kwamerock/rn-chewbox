import React, { useState } from 'react';
import styled from 'styled-components';

import { MainBoldFont, MainMediumFont } from '@/views/Components';

const FilterStickyTab = ({ titles, onPress, selected, isOrder }) => {

  return (
    <Container style={{ backgroundColor: isOrder ? "#eaeaea" : 'black' }}>
      <TabBar>
        {titles.map((title, index) =>
          <ItemContainer key={index}
            onPress={() => {
              onPress(index)
            }}
            style={{
              backgroundColor: index === selected ? "black" : "#B6B6B6",
              borderTopLeftRadius: index === 0 ? 0 : 5,
              borderBottomLeftRadius: index === 0 ? 0 : 5,
              borderTopRightRadius: index === titles.length - 1 ? 0 : 5,
              borderBottomRightRadius: index === titles.length - 1 ? 0 : 5,
            }}>

            {index === selected ? <BoldText>{title}</BoldText> : <NormalText>{title}</NormalText>}
          </ItemContainer>
        )}
      </TabBar>
    </Container>
  )
}

export default FilterStickyTab;

const Container = styled.View`
    
    background-color: white;
    align-items: center;
    background-color: #B6B6B6;
    height: 34px;
`

const TabBar = styled.View`
    flex-direction: row;
    width: 100%;
    background-color: #B6B6B6;
    height: 34px;
    padding: 2px;
`

const ItemContainer = styled.TouchableOpacity`
    flex: 1;
    height: 30px;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
`

const BoldText = styled(MainBoldFont)`
    font-size: 10px;
    color: white;
`

const NormalText = styled(MainMediumFont)`
    font-size: 10px;
    color: white;
    opacity: 0.3;
`
