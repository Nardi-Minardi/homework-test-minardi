import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  user: userReducer,
});

export default rootReducer;