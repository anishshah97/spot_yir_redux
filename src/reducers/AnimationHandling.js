export default (state = {

    //IntroVideo
    intro_end: false
    
  }, action) => {
    switch (action.type) {
      
      //Store Token
      case "MARK_VIDEO_END":
        return Object.assign({}, state, {
          intro_end : action.intro_end
        });

      default:
        return state;
    }
  };