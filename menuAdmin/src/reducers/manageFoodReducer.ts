interface initData {
  foodList: Array<object>;
  whetherLogin: boolean;
}

const initState: initData = {
  foodList: [
    {
      id: 1,
      title: '葱油花蛤',
      des: '',
      img: 'https://st-cn.meishij.net/r/102/08/14877102/a14877102_161933379339100.jpg',
    },
    {
      id: 2,
      title: '烤牛奶',
      des: '',
      img: 'https://st-cn.meishij.net/r/105/80/5270105/a5270105_161931329565083.jpg',
    },
  ],
  whetherLogin: false,
};
const manageFoodReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_LIST':
      return {...state, foodList: action.res};
    case 'UPDATE_LOGIN':
      console.log(action.res);
      return {...state, whetherLogin: action.res};
    default:
      return state;
  }
};

export default manageFoodReducer;
