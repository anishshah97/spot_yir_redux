export default (state = {

    //Calendar Data
    cal_data: [],
    max_date: new Date(),
    min_date: new Date(),
    up_bound: 0,

    //Song list
    sort_selection: "added_at",
    sort_direction: "asc"
    
  }, action) => {
    switch (action.type) {
      
      //Store Cal
      case "STORE_CALENDAR_DATA":
        return Object.assign({}, state, {
          cal_data : action.cal_data,
          max_date: action.max_date,
          min_date: action.min_date,
          up_bound: action.up_bound
        });

      case "STORE_SORT_SELECTION":
        return Object.assign({}, state, {
          sort_selection: action.selection
      });

      case "STORE_SORT_DIRECTION":
        return Object.assign({}, state, {
          sort_direction: action.direction
      });

      default:
        return state;
    }
  };