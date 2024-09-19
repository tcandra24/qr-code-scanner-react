import { createContext, useReducer, useContext, useEffect } from "react";

const INITIAL_STATE = {
  base_url: null,
  scan_end_point: null,
  group_end_point: null,
  group_detail_end_point: null,
  token: null,
};

const STORAGE_NAME = "setting-qr-code";

const getInitialState = () => {
  const savedState = localStorage.getItem(STORAGE_NAME);
  return savedState ? JSON.parse(savedState) : INITIAL_STATE;
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_BASE_URL":
      return {
        ...state,
        base_url: action.payload,
      };
    case "SET_SCAN_END_POINT":
      return {
        ...state,
        scan_end_point: action.payload,
      };
    case "SET_GROUP_END_POINT":
      return {
        ...state,
        group_end_point: action.payload,
      };
    case "SET_GROUP_DETAIL_END_POINT":
      return {
        ...state,
        group_detail_end_point: action.payload,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

const AppStateContext = createContext();
const AppDispatchContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, getInitialState());

  useEffect(() => {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(state));
  }, [state]);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
export const useAppDispatch = () => useContext(AppDispatchContext);
