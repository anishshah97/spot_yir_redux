export default (state = {

    //Calendar Data
    cal_data: [],
    max_date: new Date(),
    min_date: new Date(),
    up_bound: 0
    
  }, action) => {
    switch (action.type) {
      
      //Store Token
      case "STORE_CALENDAR_DATA":
        return Object.assign({}, state, {
          cal_data : action.cal_data,
          max_date: action.max_date,
          min_date: action.min_date,
          up_bound: action.up_bound
        });

      default:
        return state;
    }
  };