import {combineReducers} from 'redux';
import {searchQualificationReducer} from './searchQualificationReducer';
import {spellCheckerReducer} from './spellCheckerReducer';

 const rootReducer = combineReducers ({
  searchQualificationReducer,
  spellCheckerReducer
})

export default rootReducer;