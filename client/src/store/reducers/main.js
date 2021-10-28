import { TEST_COMMUNICATION, GET_COIN_PRICE_HISTORY, GET_COIN_RANKING, GET_TWEET } from "../actionTypes";

//Default state (memory)
const initState = {
  data:null,
  coin_price_history:[
    {
      name: 'Coin history column',
      type: 'column',
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
    },
    {
      name: 'Coin history area',
      type: 'area',
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    },
  ]
};

//REDUCER
export const main = (state = initState, action) =>{
  switch (action.type) {
    case TEST_COMMUNICATION:
      return {
        data:action.payload
      };
    case GET_COIN_RANKING:
      return {
        ...state,
        coin_ranking:action.payload
      }
    case GET_COIN_PRICE_HISTORY:
      // let currentData = action.payload;
      // currentData[0].data = apiResultTeamA...
      // currentData[1].data = apiResultTeamB...

      // {
      //   name: 'Team B',
      //   type: 'area',
      //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
      // },

      console.log(action.payload)

      const data = action.payload.history.map((point)=>{
        return parseInt(point.price)
      })

      return {
        ...state,
        coin_price_history:[
          {
            name:"Coin history column",
            type:'column',
            data: data.slice(data.length-11,data.length)
          },
          {
            name: 'Coin history area',
            type: 'area',
            data: data.slice(data.length-11,data.length)
          },
        ]
      }
    case GET_TWEET:
      return {
        ...state,
        tweets:action.payload
      }
    default:
      return state;
  }
};