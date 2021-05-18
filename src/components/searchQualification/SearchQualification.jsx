import { Container, Grid } from "@material-ui/core";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import Fade from "@material-ui/core/Fade";
import { SpellChecker } from "../spellChecker/SpellChecker.jsx";
import { SearchBox } from "./SearchBox.jsx";
import { GrowAccordionElem } from "./GrowAccordionElem.jsx";
import Draggable from "react-draggable";
import config from "../../config";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSearchInput,
  showCheckSpelling,
  searchSkill,
  hideCheckSpelling,
  copyCorrectedText,
} from "../../store/actions/globalActions";

export default function SearchQualification() {
  const dispatch = useDispatch();
  const searchQualificationReducer = useSelector(
    (state) => state.searchQualificationReducer
  );

  const onchangeSearchInput = (e) => {
    dispatch(changeSearchInput(e.target.value));
  };
  const onshowCheckSpelling = () => {
    dispatch(showCheckSpelling());
  };
  const onhideCheckSpelling = () => {
    dispatch(hideCheckSpelling());
  };
  const onsearchSkill = (response) => {
    dispatch(searchSkill(response));
  };
  const oncopyCorrectedText = (correctedText) => {
    dispatch(copyCorrectedText(correctedText));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const url = `${config.BASE_URL}/findSimilar/`;
    fetch(url, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
      body: JSON.stringify({
        text: searchQualificationReducer.text,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return onsearchSkill(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container maxWidth='xl' className='main-container'>
      <SearchBox
        handleSearch={handleSearch}
        handleClick={onshowCheckSpelling}
        handleChange={onchangeSearchInput}
        text={searchQualificationReducer.text}
        isCheckSpellingButtonActive={
          searchQualificationReducer.isCheckSpellingButtonActive
        }
      />
      <Grid
        container
        spacing={4}
        justify='center'
        className='grid-container-skills'>
        <Dialog
          className='modal'
          aria-labelledby='form-dialog-title'
          open={searchQualificationReducer.isCheckSpellingAppActive}
          onClose={onhideCheckSpelling}
          TransitionComponent={Draggable}
          BackdropProps={{
            timeout: 500,
          }}>
          <Fade in={searchQualificationReducer.isCheckSpellingAppActive}>
            <div className='fadein'>
              <IconButton
                edge='start'
                onClick={onhideCheckSpelling}
                id='icon-close-spellchecker'>
                <CloseIcon />
              </IconButton>
              <SpellChecker
                text={searchQualificationReducer.text}
                handleCopy={oncopyCorrectedText}
              />
            </div>
          </Fade>
        </Dialog>
        {searchQualificationReducer.skills.map((skill) => (
          <GrowAccordionElem skill={skill} />
        ))}
      </Grid>
    </Container>
  );
}
