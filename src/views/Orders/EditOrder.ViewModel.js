import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { isNil } from 'lodash';

import { useLoadingHud, useSitePicker } from '@/hooks/Utils';
import { ParamKeys, ContextNames, Screens } from '@/Constants';
import { useOvermind } from '@/store';

const tag = 'EditOrder.ViewModel:: '

export default (viewModel = props => {
  const navigation = props.navigation;
  const orderRef = React.useRef(props.route.params[ParamKeys.order])
  const order = orderRef.current; // This is just the order store, not plain javascript object.
  const [updateOrderApi, { data, error, loading }] = useUpdateOrder()
  const updateTimeoutRef = React.useRef()
  const closeAfterEditButton = React.useRef(false)
  const [tip, setTip] = useState({});
  const { state, actions } = useOvermind();
  const { alert } = state;
  const _pickSite = useSitePicker()

  // On Component Did Mount
  useEffect(() => {
    let _timeOut = setTimeout(() => {
      // Assign trigger update order
      props.route.params.triggerUpdateOrder = function () {
        tryUpdate()
      };
    }, 500);	// The delay is because to prevent the first call from initial states.

    return () => {
      clearTimeout(_timeOut);
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
    };
  }, []);

  useLoadingHud(loading && closeAfterEditButton.current)

  // When Order is updated via api, just update the order with snapshot
  useEffect(() => {
    if (data !== undefined) {  // When Order is arrived!
      // check if should close after edit button
      if (closeAfterEditButton.current) {
        alert.showSuccess('Your order was updated', 'Edit Order')
        // Pop to previous screen
        navigation.pop()
      } else {
        // Just update the component
        // Awesome mobx-state-tree
        order.updateAll(data)
      }

      // Trigger Orders update
      actions.order.triggerOrdersUpdate();

    } else if (error) {
      if (closeAfterEditButton.current) {
        actions.alert.showError('Updating order failed', 'Edit Order')
        // Reset to false.
        closeAfterEditButton.current = false
      }
    }
  }, [data, error])

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  function onChangeDate(date) {
    order.setDeliverByDate(date);

    // Try to update
    // tryUpdate()
  }

  function onChangeTip(tip) {
    setTip(tip)
  }

  function pickSite() {
    _pickSite((site) => {
      order.setDeliverTo(site)
    })
  }

  function onPickTime(time) {
    order.setDeliverByTime(time);
    setDatePickerVisible(false);

    // Try to update
    // tryUpdate()
  }

  function onRemoveFood(item, index) {
    const totalLeft = toJS(order.items).filter(o => o.product.isAddOn === false).length
    console.log(toJS(order), totalLeft, "=======================");
    if (totalLeft <= 1) {
      Alert.alert(
        "Please Confirm",
        "You are removing the only item on your order.  If you continue, your order will be cancelled. Please confirm.",
        [
          {
            text: "Okay", onPress: () => {
              order.removeFood(item);

              // Try to update
              // tryUpdate()
            }
          },
          {
            text: "Cancel", onPress: () => { }
          }
        ])
    } else {
      order.removeFood(item);

      // Try to update
      // tryUpdate()
    }
  }

  function buildUpdateOrderVariables() {
    const variables = order.toEditRequestJS()
    console.log(
      'EditOrder.ViewModel:: buildUpdateOrderVariables() - Data to be sent to server - ',
      variables, order.tipPercentage
    );

    //console.log("Stringified variables -----------", JSON.stringify(variables))
    return ({ ...variables, ...tip })
  }

  function tryUpdate() {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current)
    }
    updateTimeoutRef.current = setTimeout(() => {
      updateOrder()
    }, 500)
  }

  async function updateOrder() {
    const variables = buildUpdateOrderVariables()

    console.log("=====>update order", variables);

    await updateOrderApi(variables)
    if (props.route.params && props.route.params.update) {
      props.route.params.update(order)
    }
  }

  function onAddItem(isEditOrder) {
    // create navigation context
    const context = {
      [ParamKeys.backScreenKey]: props.route.key, // Current Screen Key
      [ParamKeys.onAddCartItem]: (item) => {
        try {
          order.addCartItem(toJS(item))
          // Try to update
          // tryUpdate()
        } catch (e) {
          console.log(e);
        }
      },
      [ParamKeys.contextName]: ContextNames.editOrder2AddOrViewFood,
      [ParamKeys.isEditOrder]: isEditOrder,
    };

    console.log("====>", order)

    // Start navigate with context
    navigation.navigate(Screens.kitchensModal, {
      [ParamKeys.context]: context,
      event: order.event
    });
  }

  function onChangeAddOns() {
    // scheduleUpdate(1000)
  }

  return {
    order: order,
    onChangeDate,
    onChangeTip,
    isDatePickerVisible,
    setDatePickerVisible,
    showDatePicker: () => setDatePickerVisible(true),
    onPickTime,
    hideDatePicker: () => setDatePickerVisible(false),
    onAddItem,
    onRemoveFood,
    pickSite,
    onChangeAddOns,
    isUpdatingOrder: loading,
    isUpdateFailed: !isNil(error),
    saveOrder: () => {
      closeAfterEditButton.current = true
      updateOrder()
    }
  };
});
