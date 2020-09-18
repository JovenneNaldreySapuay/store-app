import {
  ADD_TO_CART_SUCCESS,
  FETCH_CART_BY_USER,
  FETCH_CART_ITEMS,
  DELETE_PRODUCT_CART,
} from "../actions/types";

const initialState = {
  addedIds: [],
  quantityById: {},
  items: [],
  abandonedItems: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
      // console.log("calling ADD_TO_CART_SUCCESS reducer", action);
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case FETCH_CART_ITEMS:
      return {
        ...state,
        abandonedItems: action.payload,
      };

    case FETCH_CART_BY_USER:
      // console.log("calling FETCH_CART_BY_USER reducer", action);
      return {
        ...state,
        items: action.payload,
      };

    case DELETE_PRODUCT_CART:
      return {
        ...state,
        items: state.items.filter((product) => product._id !== action.payload),
      };

    default:
      return state;
  }
}
/*
const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
      console.log("calling ADD_TO_CART_SUCCESS...", action);
      const productid = action.payload.productid;

      console.log("state", state);
      console.log("productid", productid);

      if (state.indexOf(productid) !== -1) {
        return state;
      }

      return {
        ...state,
        productid,
      };

    default:
      return state;
  }
};

export const getAddedIds = (state) => state.addedIds;

const quantityById = (state = initialState.quantityById, action) => {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
      const { productid, quantity } = action.payload;
      console.log("Quantity", quantity);
      console.log("productid", productid);

      return {
        ...state,
        [productid]: (state[productid] || 0) + quantity,
      };

    default:
      return state;
  }
};

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0;
*/
