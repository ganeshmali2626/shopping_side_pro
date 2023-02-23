import { createAction, props } from "@ngrx/store";
import { ProdutInfo } from "./cart.reducer";
export const addCart = createAction('addCart',props<{productData:any}>());
export const incrementQuantity = createAction('incrementQuantity',props<{dataInfo:any}>());
export const decrementQuantity = createAction('decrementQuantity',props<{dataInfo:any}>());
export const addTotal = createAction('addTotal');
export const addOneTotal = createAction('addTotal');
export const deleteProduct = createAction('deleteProduct',props<{dataInfo:any}>());
export const addOneCart = createAction('addOneCart',props<{dataInfo11:any}>());

