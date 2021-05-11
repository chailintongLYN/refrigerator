//更新菜谱
export const updateListAction = res => {
  return {
    type: 'UPDATE_LIST',
    res,
  };
};

//是否登录
export const updateLoginStatus = res => {
  return {
    type: 'UPDATE_LOGIN',
    res,
  };
};
