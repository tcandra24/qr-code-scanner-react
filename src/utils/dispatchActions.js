import {
  SET_BASE_URL,
  SET_TOKEN,
  SET_SCAN_END_POINT,
  SET_GROUP_END_POINT,
  SET_GROUP_DETAIL_END_POINT,
} from "../constants/settingTypes";

export const dispatchAction = (dispatch, key, value) => {
  const actionTypes = {
    base_url: SET_BASE_URL,
    token: SET_TOKEN,
    scan_end_point: SET_SCAN_END_POINT,
    group_end_point: SET_GROUP_END_POINT,
    group_detail_end_point: SET_GROUP_DETAIL_END_POINT,
  };

  if (value !== undefined) {
    dispatch({
      type: actionTypes[key],
      payload: value,
    });
  }
};
