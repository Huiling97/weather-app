import { createContext, useEffect, useReducer } from 'react';

const EntryContext = createContext();

const entryReducer = (state, action) => {
  let updatedEntries;

  switch (action.type) {
    case 'SET':
      updatedEntries = action.payload;
      break;
    case 'ADD':
      updatedEntries = [action.payload, ...state];
      break;
    case 'DELETE':
      updatedEntries = state.filter((entry) => entry.time !== action.payload);
      break;
    default:
      return state;
  }
  localStorage.setItem('weatherData', JSON.stringify(updatedEntries));
  return updatedEntries;
};

const EntryContextProvider = ({ children }) => {
  const [entryState, dispatch] = useReducer(entryReducer, []);

  useEffect(() => {
    const initState = JSON.parse(localStorage.getItem('weatherData')) || [];
    dispatch({ type: 'SET', payload: initState });
  }, []);

  const addEntry = (entryData) => {
    dispatch({ type: 'ADD', payload: entryData });
  };

  const deleteEntry = (time) => {
    dispatch({ type: 'DELETE', payload: time });
  };

  const value = {
    entries: entryState,
    addEntry,
    deleteEntry,
  };

  return (
    <EntryContext.Provider value={value}>{children}</EntryContext.Provider>
  );
};

export { EntryContext, EntryContextProvider };
