import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import styles from "./SearchBar.module.scss";
import { Icons } from "../../helpers/Icons";
import firebase from "../../firebase";
import "firebase/firestore";

const SearchBar = ({ containerStyling }: any) => {
  const [query, setQuery] = useState<string>("");
  const history = useHistory();
  const [shouldSuggest, setShouldSuggest] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<any>([]);
  const suggestionsDoc: any = firebase.firestore().collection("suggestions").doc("suggestions");

  useEffect(() => {
    fetchSuggestionsFromFirebase();
  }, [query])

  const fetchSuggestionsFromFirebase = () => {
    suggestionsDoc.get().then((response: any) => {
      setSuggestions(Object.values(response.data())); 
    })
  }

  const addSuggestionsToFirebase = (term: string) => {
    if(term.length >= 3) {
      suggestionsDoc.update({ [term]: term })
    }
  }
  
  const setSearchQuery = (e: any) => {
    setQuery(e.target.value);
    if(e.target.value.length > 2) {
      setShouldSuggest(true);
    } else {
      setShouldSuggest(false);
    }
  }

  const clearSearchQuery = () => {
    setQuery('');
  }

  const selectSuggestion = (e: any) => {
    history.push(`/search/photos/${e.target.textContent}`);
  }

  const searchPhotos = (e: any) => {
    e.preventDefault();
    addSuggestionsToFirebase(query);
    history.push(`/search/photos/${query}`);
  }

  const renderSuggestions = (searchedTerm: string) => {
    let suggestionsArr: string[] = [];
    let uniqueSuggestions: any; 
    let uniqueSuggestionsArr: any;

    suggestionsArr = suggestions.filter((word: any) => word.substr(0, searchedTerm.length).toLowerCase() === searchedTerm.toLowerCase()).sort();

    if (suggestionsArr.length < 5) {
      suggestions.sort().filter((word: any) => {
        if (word.trim().toLowerCase().includes(searchedTerm.trim().toLowerCase())) suggestionsArr.push(word);
      })
    }

    uniqueSuggestions = new Set(suggestionsArr);
    uniqueSuggestionsArr = Array.from(uniqueSuggestions);

    if (uniqueSuggestionsArr.length > 0) {
      return (
        <div className={styles.suggestions_container}>
          {uniqueSuggestionsArr.slice(0, 5).map((suggestion: any) => {
            return <span onClick={(e) => selectSuggestion(e)} className={styles.suggestion}>{suggestion}</span>
          })}
        </div>
      )
    } else {
      return (
        <div className={styles.suggestions_container}>
            <span className={styles.suggestion}>No suggestions found</span>
        </div>
      )
    }
  }

  return (
    <form className={containerStyling ? styles.rounded_searchbar_form : styles.squared_searchbar_form} onSubmit={(e) => searchPhotos(e)}>
      <button type="submit" className={styles.button_search}>{Icons.iconSearch}</button>
      <input
      onChange={(e) => setSearchQuery(e)} 
      className={styles.search_bar} 
      value={query}
      type="text" 
      placeholder="Search free high-resolution photos" 
      required />
      {shouldSuggest && query && renderSuggestions(query)}
      {query && <button onClick={() => clearSearchQuery()} className={styles.button_clear_input}>{Icons.iconClose}</button>}
    </form>
  )
}

export default withRouter(SearchBar);