import React, { useState, useRef } from "react";
import Dictionary from "./Dictionary";

const DictionarySearch = (props) => {
    const [sourceLang, setSourceLang] = useState("EN")
    const [targetLang, setTargetLang] = useState(props.currentLang)

    const [searchedPhrase, setSearchedPhrase] = useState(null)
    const [translationResult, setTranslationResult] = useState(null);
    
    const dictInputRef = useRef(null);
    const dictionary = new Dictionary();
    const dictCharLimit = 15;

    const flagsAPI = "https://flagsapi.com/";
    const flagStyle = "/flat/16.png";
    let sourceLangFlag = ""
    let targetLangFlag = ""

    const handleDictSubmit = async (e) => {
        e.preventDefault();
        setSearchedPhrase(dictInputRef.current.value)
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

    const switchLang = () => {
        setSourceLang(targetLang);
        setTargetLang(sourceLang)
        setSearchedPhrase(null)
        setTranslationResult(null)
    }

    const sourceTargetLang = () => {
        sourceLangFlag = sourceLang
        targetLangFlag = targetLang
        if (sourceLang === "EN") sourceLangFlag = "US"
        if (targetLang === "EN") targetLangFlag = "US"

        return (
            <div className="dictionarysubtitle">

                {sourceLang}<img src={flagsAPI + sourceLangFlag + flagStyle} />

                &nbsp; <button onClick={() => switchLang()}>{"=>"}</button> &nbsp;

                {targetLang}<img src={flagsAPI + targetLangFlag + flagStyle} /></div>
        );
    }

    const results = () => {
        if(searchedPhrase === null || translationResult === null) return
        return (<>
        <div className="dictionarysubtitle"><img src={flagsAPI + sourceLangFlag + flagStyle} /> {searchedPhrase}</div>
        <div className="dictionarysubtitle"><img src={flagsAPI + targetLangFlag + flagStyle} /> {translationResult}</div>
        </>)
    }

    return (
        <div className="dashboardelements">
            <div className="boxcontainer">
                <span className="dictionarytitle">
                    Search the dictionary for definitions
                </span>
                <div className="greycontainer">
                    <div>{sourceTargetLang()}</div>
                    <div>{searchForm()}</div>
                    <div>{results()}</div>
                </div>
            </div>
        </div>
    );
};

export default DictionarySearch;
