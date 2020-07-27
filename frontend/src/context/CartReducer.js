export default (state, action) => {
  switch (action.type) {
    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "ADD_ITEM":
      /* const items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity = item.quantity + 1;
          action.payload = null;
        }
      });
      console.log(items);*/
      return {
        ...state,
        items: [
          action.payload,
          ...state.items.filter((item) => item.id !== action.payload.id),
        ],
      };
    default:
      return state;
  }
};
