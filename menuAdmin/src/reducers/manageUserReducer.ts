interface initData {
  userList: Array<object>;
}

const initState: initData = {
  userList: [
    {
      id: 1,
      username: '苍暮颜',
      img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2F50%2Fv2-af83bfea4dbf90fc7d3571ddb00753ec_hd.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623312878&t=eebc5817d51407a7a93319071df82db0',
      detail: [
        {
          id: 1,
          create_time: '1620713262000',
          text: '杏鲍菇和胡萝卜切细长滚刀块；青椒去籽切菱形块，青蒜切段，姜切粗条；',
          img: 'https://st-cn.meishij.net/rs/207/244/2811207/n2811207_161925527172581.jpg',
        },
      ],
    },
    {
      id: 2,
      username: '柳絮泡泡',
      img: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3968417432,4100418615&fm=26&gp=0.jpg',
      detail: [
        {
          id: 1,
          create_time: '1619849262000',
          text: '锅里面放一点油，把鸡胸肉放入锅中，煎到双面金黄。喜欢吃有嚼劲儿的可以多煎一会，这样吃起来更有韧劲',
          img: 'https://st-cn.meishij.net/rs/57/65/14891307/n14891307_161919000509734.jpg',
        },
      ],
    },
  ],
};
const manageUserReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_USER_LIST':
      return {...state, userList: action.res};
    default:
      return state;
  }
};

export default manageUserReducer;
