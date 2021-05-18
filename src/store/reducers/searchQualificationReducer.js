import {
    CHANGE_SEARCH_INPUT,
    SHOW_CHECKSPELLING_DIALOG,
    SEARCH_SKILL,
    HIDE_CHECKSPELLING_DIALOG,
    COPY_CORRECTED_TEXT
  } from "../consts";
  
  const initialState = {
    text: " ",
    skills: [],
    isCheckSpellingButtonActive: false,
    isCheckSpellingAppActive: false,
  };

  const addId = (arr) => {
    let id = 100;
    return arr.map((item) => ({
      ...item,
      id: id++,
    }));
  };
  
  export const searchQualificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case CHANGE_SEARCH_INPUT: {
        return {
          ...state,
          text: action.payload,
          isCheckSpellingButtonActive: true,
        };
      }
      case SHOW_CHECKSPELLING_DIALOG: {
        return {
          ...state,
          isCheckSpellingAppActive: true,
        };
      }
      case SEARCH_SKILL: {
        return {
          ...state,
          skills: addId(action.payload["Top n most similar ESCO skills"]),//TODO:: zmienić na backendzie na items
        };
      }
      case HIDE_CHECKSPELLING_DIALOG: {
        return {
          ...state,
          isCheckSpellingAppActive: false,
        };
      }
      
      case COPY_CORRECTED_TEXT: {
        return {
          ...state,
          text: action.payload,
        };
      }
      default: {
        return state;
      }
    }
  };
  