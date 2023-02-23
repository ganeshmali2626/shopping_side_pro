import { createReducer, on } from '@ngrx/store';
import { count } from 'rxjs';
import {
  addCart,
  addOneCart,
  addOneTotal,
  addTotal,
  decrementQuantity,
  deleteProduct,
  incrementQuantity,
} from './cart.action';
export interface ProdutInfo {
  _id: string;
  productId: string;
  name: string;
  description: string;
  price: number;
  subTotal: number;
  qty: number;
  images: { public_id: string; url: string }[];
}
export interface cart {
  items: ProdutInfo[];
  total: number;
  deliveryFee: number;
}
export interface oneCart {
  items: ProdutInfo[];
  total: number;
  deliveryFee: number;
}
export const initialState: cart = {
  items: [],
  total: 0,
  deliveryFee: 50,
};
export const initialState1: oneCart = {
  items: [],
  total: 0,
  deliveryFee: 50,
};


export const cartReducer = createReducer(
  initialState,
  on(addCart, (state, { productData }) => {
    console.log(state.items);
    let index = state.items.find((data) => data['_id'] == productData['_id']);
    let temp = structuredClone(state.items);
    let totalprice = 0;
    console.log(index);
    if (index === undefined) {
      temp.push(productData);
    }

    console.log(temp);
    // for (let i = 0; i < temp.length; i += 1) {
    //   totalprice += temp[i].price;
    // }
    return {
      ...state,
      items: temp,
    };
  }),
  on(incrementQuantity, (state, { dataInfo }) => {
    let temp = structuredClone(state.items);
    let data = temp.findIndex((i: any) => i._id === dataInfo);
    temp[data].qty++;
    temp[data].subTotal = temp[data].qty * temp[data].price;

    // temp[dataInfo]['qty'] += 1;
    // temp[dataInfo]['subTotal'] =
    //   temp[dataInfo]['qty'] * temp[dataInfo]['price'];
    return {
      ...state,
      items: temp,
    };
  }),
  on(decrementQuantity, (state, { dataInfo }) => {
    let temp = structuredClone(state.items);
    let data = temp.findIndex((i: any) => i._id === dataInfo);

    if (temp[data]['qty'] > 1) {
      temp[data].qty--;
      temp[data].subTotal = temp[data].qty * temp[data].price;
    } else {
      // temp[dataInfo1]['qty'] = 1;
      // temp.splice(dataInfo1, 1);
    }

    return {
      ...state,
      items: temp,
    };
  }),
  on(addTotal, (state) => {
    let temp = structuredClone(state.items);
    var cartTotal = structuredClone(state.total);
    var count = 0;
    temp.map((data: any) => {
      count = count + data['subTotal'];
    });
    console.log(cartTotal);
    return {
      ...state,
      total: count,
    };
  }),
  on(deleteProduct, (state, { dataInfo }) => {
    let temp = structuredClone(state.items);
    let data = temp.findIndex((i: any) => i._id === dataInfo);

    temp.splice(data, 1);

    return {
      ...state,
      items: temp,
    };
  })
);
export const cartReducer1 = createReducer(
  initialState1,
  on(addOneCart, (state1, { dataInfo11 }) => {
    console.log(state1.items);
    let index = state1.items.find((data) => data['_id'] == dataInfo11['_id']);
    let temp1 = structuredClone(state1.items);
    let totalprice = 0;
    console.log(index);
    if (index === undefined) {
      temp1.push(dataInfo11);
    }
    console.log(temp1.length);
    if(temp1.length>1)
    {
      temp1.splice(0, 1);
    }


    console.log(temp1);
    return {
      ...state1,
      items: temp1,
    };
  }),
  on(addOneTotal, (state) => {
    let temp1 = structuredClone(state.items);
    var cartTotal = structuredClone(state.total);
    var count = 0;
    temp1.map((data: any) => {
      count = count + data['subTotal'];
    });
    console.log(cartTotal);
    return {
      ...state,
      total: count,
    };
  }),
);

