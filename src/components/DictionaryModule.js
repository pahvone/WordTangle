import React, { useState, useRef } from "react";
import Dictionary from "./Dictionary";
import { Spinner } from "react-bootstrap";

const DictionarySearch = (props) => {
  const [sourceLang, setSourceLang] = useState("EN");
  const [targetLang, setTargetLang] = useState(props.currentLang);

  const [langSwitch, setLangSwitch] = useState(false);

  const [searchedPhrase, setSearchedPhrase] = useState(null);
  const [translationResults, setTranslationResults] = useState(null);
  const [resultsElement, setResultsElement] = useState(null);

  const dictInputRef = useRef(null);
  const dictionary = new Dictionary();
  const dictCharLimit = 15;

  const flagsAPI = "https://flagsapi.com/";
  const flagStyle = "/flat/16.png";
  let sourceLangFlag = "";
  let targetLangFlag = "";

  if (
    !langSwitch &&
    (sourceLang !== props.currentLang || targetLang !== props.currentLang)
  ) {
    setSourceLang("EN");
    setTargetLang(props.currentLang);
    setLangSwitch(true);
  }

  const handleDictSubmit = async (e) => {
    e.preventDefault();
    setSearchedPhrase(dictInputRef.current.value);
    setResultsElement(<Spinner animation="border" role="status" />);

    await dictionary
      .translateText(dictInputRef.current.value, sourceLang, targetLang)
      .then((response) => {
        if (response === null) setResultsElement("An error occurred");
        else if (response.results.length === 0)
          setResultsElement(
            "Results could not be found. Check the spelling or try again later",
          );
        else {
          setTranslationResults(response);
        }
      });

    /* DUMMY DATA
        let dummyResults = {
            results: [
              "dinero", "moneda", "plata",
              "divisa", "pecunia", "oro",
              "pasta", "pisto", "capital",
              "vuelto", "efectivo", "posesión",
              "pecuniario", "pella", "caché"
            ]
          };
            
        setTranslationResults(dummyResults)*/
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

  const switchLang = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSearchedPhrase(null);
    setTranslationResults(null);
  };

  const getFlags = () => {
    sourceLangFlag = sourceLang;
    targetLangFlag = targetLang;
    if (sourceLang === "EN") sourceLangFlag = "US";
    if (targetLang === "EN") targetLangFlag = "US";
  };

  const sourceTargetLang = () => {
    getFlags();

    return (
      <div className="dictionarysubtitle">
        {sourceLang}
        <img src={flagsAPI + sourceLangFlag + flagStyle} />
        &nbsp; <button onClick={() => switchLang()}>{"=>"}</button> &nbsp;
        {targetLang}
        <img src={flagsAPI + targetLangFlag + flagStyle} />
      </div>
    );
  };

  const generateResultsElements = () => {
    getFlags();

    let element = [];
    let topResult = translationResults.results[0].word;
    let altResultList = translationResults.results.slice(1);
    let altResultElements = [];

    for (var i = 0; i < 5; i++) {
      const cells = [];
      for (var j = 0; j < 3; j++) {
        const index = i * 3 + j;
        if (index < altResultList.length) {
          cells.push(<td key={"cell" + index}>{altResultList[index].word}</td>);
        } else {
          cells.push(<td key={"cell" + index}></td>);
        }
      }
      altResultElements.push(<tr key={"result" + i}>{cells}</tr>);
    }

    element.push(
      <div className="dictionarysubtitle">
        <img src={flagsAPI + sourceLangFlag + flagStyle} /> {searchedPhrase}
      </div>,
    );
    element.push(
      <div className="dictionarysubtitle">
        <img src={flagsAPI + targetLangFlag + flagStyle} /> {topResult}
      </div>,
    );
    element.push(<div className="dashline" />);
    element.push(
      <div className="dictionarysubtitle"> Alternative translations: </div>,
    );
    element.push(
      <div>
        {" "}
        <table width="100%">{altResultElements}</table>
      </div>,
    );

    setResultsElement(element);
  };

  if (translationResults !== null) {
    generateResultsElements();
    setTranslationResults(null);
  }

  return (
    <div className="dashboardelements">
      <div className="boxcontainer">
        <div className="greycontainer">
          <div>{sourceTargetLang()}</div>
          <div>{searchForm()}</div>
          <div>{resultsElement}</div>
        </div>
      </div>
    </div>
  );
};

export default DictionarySearch;
