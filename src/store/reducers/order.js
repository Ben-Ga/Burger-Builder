import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'


const initialState= {
    orders:[],
    loading: false,
    purchased: false
}


const purchaseAttempt = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.purchaseBurgerSuccess:
            const newOrder = {
                ...action.orderData,
                id: action.orderID
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            }
        case actionTypes.purchaseBurgerFailed:
            return updateObject(state, {loading: false})
        case actionTypes.purchaseBurgerStart:
            return updateObject(state, {loading: true})
        case actionTypes.purchaseInit:
            return updateObject(state, {purchased: false})
        case actionTypes.loadOrdersSuccess:
            return{
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionTypes.loadOrdersError:
            return updateObject(state, {loading: false})
        case actionTypes.loadOrdersStart:
            return updateObject(state, {loading: true})
        default:
            return state;
    }

}

export default purchaseAttempt