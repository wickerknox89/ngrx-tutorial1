import { createReducer, on } from "@ngrx/store";
import { Bucket } from "../../../models/bucket.model";
import { AddToBucket } from "../actions/bucket.action";

const initialState:Bucket[] = []

export const bucketReducer = createReducer(
    initialState, 
    on(AddToBucket, (state, action)=>{
        const bucketItem = state.find(item => item.id == action.payload.id)
        if(bucketItem){
            return state.map(item => {
                return item.id === action.payload.id ? {...item, quantity:item.quantity + action.payload.quantity} : item
            })
        }
        else{
            return [
                ...state,
                action.payload
            ]
        }
}))

