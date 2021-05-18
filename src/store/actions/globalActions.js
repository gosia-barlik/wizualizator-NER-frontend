import {
  CHANGE_SEARCH_INPUT,
  SHOW_CHECKSPELLING_DIALOG,
  SEARCH_SKILL,
  HIDE_CHECKSPELLING_DIALOG,
  COPY_CORRECTED_TEXT
} from "../consts";

export const changeSearchInput = (inputValue) => {
  return { type: CHANGE_SEARCH_INPUT, payload: inputValue };
};
export const showCheckSpelling = () => {
  return { type: SHOW_CHECKSPELLING_DIALOG };
};
export const searchSkill = (foundSkills) => {
  return { type: SEARCH_SKILL, payload: foundSkills};
};
export const hideCheckSpelling = () => {
  return { type: HIDE_CHECKSPELLING_DIALOG };
};
export const copyCorrectedText = (correctedText) => {
  return { type: COPY_CORRECTED_TEXT, payload: correctedText};
};




