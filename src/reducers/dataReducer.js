export const INITIAL_STATE = {
  groups: [],
  group: {},
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case "GET_GROUP":
      return {
        ...state,
        groups: action.payload,
      };
    case "GET_GROUP_DETAIL":
      return {
        ...state,
        group: action.payload,
      };
    default:
      return state;
  }
};
