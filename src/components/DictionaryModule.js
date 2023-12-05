import React, { useState, useRef } from "react";
import Dictionary from "./Dictionary";

const DictionarySearch = (props) => {
  const [translationResult, setTranslationResult] = useState(null);
  const dictInputRef = useRef(null);
  const dictionary = new Dictionary();
  const dictCharLimit = 15;

  //console.log(currentLang)

  const handleDictSubmit = async (e) => {
    e.preventDefault();
    console.log(dictInputRef.current.value);
    const sourceLang = "EN"; //default
    const targetLang = props.currentLang; //test
    const result = await dictionary.translateText(
      dictInputRef.current.value,
      sourceLang,
      targetLang,
    );
    if (result) setTranslationResult(result);
  };

  const searchForm = () => {
    return (
      <form className="form-group" onSubmit={(e) => handleDictSubmit(e)}>
        <label>
          <input
            className="form-control dict-search-input"
            type="text"
            name="name"
            ref={dictInputRef}
            maxLength={dictCharLimit}
          />
        </label>

        <input
          type="submit"
          value="Search"
          className="btn dict-search-button"
        />
      </form>
    );
  };

  return (
    <div className="dashboardelements">
      <div className="boxcontainer">
        <span className="dictionarytitle">
          Search the dictionary for definitions
        </span>
        <div className="greycontainer">
          {searchForm()}

          <div>Results:</div>
          <div>{translationResult}</div>
        </div>
      </div>
    </div>
  );
};

export default DictionarySearch;
