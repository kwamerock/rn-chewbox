import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { get, defaultTo } from 'lodash';
import numeral from 'numeral';
import { useRoute } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import { BaseTextInput, MainRegularFont } from '@/views/Components';
import { useOrder } from '@/hooks/Utils';

const TipSelector = ({ style }) => {
  const order = useOrder()
  const route = useRoute()

  function setPercentage(p) {
    order.setTipPercent(p)
  }

  const index = React.useMemo(() => {
    const p = order.tipPercentage
    if (Math.abs(p - 10) < 0.001) {
      return 0
    } else if (Math.abs(p - 15) < 0.001) {
      return 1
    } else if (Math.abs(p - 20) < 0.001) {
      return 2
    } else {
      return 3
    }
  }, [order.tipPercentage])

  function callUpdateOrder() {
    const updateOrder = get(route, 'params.triggerUpdateOrder')		// This is from edit order, whether this should be called or not
    updateOrder && updateOrder()
  }
  // call update order whenever the index is changed
  React.useEffect(callUpdateOrder, [index])

  function onChangeTipAmount(text) {
    const amount = defaultTo(parseInt(text.replace(/\D/g, '')), 0) / 100.0
    order.setCustomTip(amount)
  }

  function onBlurTipAmount() {
    // When custom tip, trigger update
    if (index == 3 && order.tip > 0.001) { // only call update order when amount is valid
      callUpdateOrder()
    }
  }

  return (
    <View style={style}>
      <TipRow>
        <OptionBox onPress={() => setPercentage(10)} style={{ backgroundColor: index == 0 ? "black" : "#DBDBDB" }}>
          <Feather name="check" size={16} color={index == 0 ? "white" : "#DBDBDB"} />
        </OptionBox>
        <TipTitle>10% Tip</TipTitle>
        <TipPrice>${(order.subtotal / 10).toFixed(2)}</TipPrice>
      </TipRow>
      <TipRow>
        <OptionBox onPress={() => setPercentage(15)} style={{ backgroundColor: index == 1 ? "black" : "#DBDBDB" }}>
          <Feather name="check" size={16} color={index == 1 ? "white" : "#DBDBDB"} />
        </OptionBox>
        <TipTitle>15% Tip (Recommended)</TipTitle>
        <TipPrice>${(order.subtotal / 100 * 15).toFixed(2)}</TipPrice>
      </TipRow>
      <TipRow>
        <OptionBox onPress={() => setPercentage(20)} style={{ backgroundColor: index == 2 ? "black" : "#DBDBDB" }}>
          <Feather name="check" size={16} color={index == 2 ? "white" : "#DBDBDB"} />
        </OptionBox>
        <TipTitle>20% Tip</TipTitle>
        <TipPrice>${(order.subtotal / 100 * 20).toFixed(2)}</TipPrice>
      </TipRow>
      <TipRow>
        <OptionBox onPress={() => setPercentage(0)} style={{ backgroundColor: index == 3 ? "black" : "#DBDBDB" }}>
          <Feather name="check" size={16} color={index == 3 ? "white" : "#DBDBDB"} />
        </OptionBox>
        <TipTitle>Custom Tip</TipTitle>
        <TipInput
          placeholder="$--"
          placeholderColor="#6B6B6B"
          value={numeral(order.tip).format('0.00')}
          onChangeText={onChangeTipAmount}
          onBlur={onBlurTipAmount}
        />
      </TipRow>
    </View>
  )
}

export default TipSelector;

const TipRow = styled.View`
  align-self:stretch;
  flex-direction: row;
  height: 36px;
  align-items: center;
  justify-content: space-between
`

const OptionBox = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`

const TipTitle = styled(MainRegularFont)`
  color: black;
  font-size: 12px;
  line-height: 15px;
  margin-left: 8px;
  flex: 1;
`

const TipPrice = styled(MainRegularFont)`
  color: black;
  font-size: 12px;
  line-height: 15px;
`

const TipInput = styled(BaseTextInput)`
  height:32px;
  width: 60px;
  background-color: #E4E4E4;
  border-radius: 16px;
  color: black;
  padding-horizontal: 10px;
  text-align:center;
`
