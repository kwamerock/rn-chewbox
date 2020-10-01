import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

import { Colors } from '@/styles/Colors';
import { Styles } from '@/styles';
import { StyledText, MainBoldFont } from './controls/Text';
import Container from './Container';

const NavBarFilter = props => {
  return (
    <FilterContainer disabled={props.disabled} onPress={props.onPress}>
      <Container />
      <FilterContent>
        <FilterTitle>{props.title}</FilterTitle>
        <Filter>{props.filter}</Filter>
      </FilterContent>
      <NavBarRight>
        {!props.disabled && <FilterButton>
          <Feather size={18} name="chevron-down" color='#7d7979' />
        </FilterButton>}
      </NavBarRight>
    </FilterContainer>
  )
}

const FilterContainer = styled.TouchableOpacity`
  ${Styles.between_center}
  background-color:${Colors.bgSemiWhite};
  flex: 1;
  height: 36px;
  border-radius:20px;
  flex-direction:row;
`;

const FilterContent = styled.View`
  align-items: center;
`;

const FilterTitle = styled(MainBoldFont)`
  font-size: 10px;
  line-height: 10px;
  font-weight:bold;
  color: #7d7979;
`;

const Filter = styled(StyledText)`
  font-size: 12px;
  line-height:13px;
  font-weight:bold;
`;

const FilterButton = styled.View`
  padding: 10px;
`;

const NavBarRight = styled.View`
  ${Styles.center_end};
  flex: 1;
`;

export default NavBarFilter;
