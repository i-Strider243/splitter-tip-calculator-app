import React, { useState } from 'react';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [state, setState] = useState({
    amount: 0,
    numberOfPeople: 0,
    tipAmount: 0,
    totalPerPerson: 0,
    showLabel: false
  });

  const inputAmount = (value) => {
    setState({...state, amount: Number(value)})
  }

  const inputNoOfPeople = (people) => {
    setState({...state, numberOfPeople: Number(people), showLabel: false})
  }

  const calcTip = (percent) => {
    if (state.numberOfPeople < 1) {
      setState({...state, showLabel: true})
      return;
    }
    const tipAmount = state.amount * (percent / 100);

    const tipAmountPerHead = tipAmount / state.numberOfPeople;    

    const totalAmountPerPerson = (state.amount / state.numberOfPeople) + tipAmountPerHead;

    setState({ ...state, tipAmount: tipAmountPerHead, totalPerPerson: totalAmountPerPerson });    
  };

  const reset = () => {
    setState({
      amount: 0,
      tipPercentage: 0,
      numberOfPeople: 0,
      tipAmount: 0,
      totalPerPerson: 0,
    });
  }

  return (
    <AppContext.Provider value={{
      state,
      inputAmount,
      inputNoOfPeople,
      calcTip,
      reset
    }}>
      {children}
    </AppContext.Provider>
  )
}

export {AppContext, AppProvider}
