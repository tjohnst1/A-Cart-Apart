import React from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlighter';
import { uniqueId } from 'lodash';
import './searchresults.scss';

const SearchResults = (props) => {
  const { searchTerms } = props.filter;
  const { names, tags } = props.filter.matches;

  function generateMatchList(matchArr, searchPhrase, headline) {
    // if the match array isn't empty, generate a list
    if (matchArr.length > 0) {
      const resultItems = matchArr.map((item) => {
        const highlighted = (<Highlight search={searchTerms} matchElement="span">{item}</Highlight>);
        return (<button key={uniqueId()}>{highlighted}</button>);
      });

      return (
        <div className="search-results__group">
          <h4 className="search-results__subheadding">{ headline }</h4>
          { resultItems }
        </div>
      );
    }
    // return null, if the match arr is empty
    return null;
  }

  function showNoResults(tagsArr, namesArr) {
    if ((tagsArr.length === 0) && (namesArr.length === 0)) {
      return <p className="search-results__no-results">No search results found</p>;
    }
    return null;
  }

  return (
    <div className="search-results">
      { generateMatchList(names, searchTerms, 'Carts') }
      { generateMatchList(tags, searchTerms, 'Tags') }
      { showNoResults(tags, names) }
    </div>
  );
};

SearchResults.propTypes = {
  filter: PropTypes.shape({
    matches: PropTypes.shape({
      names: PropTypes.arrayOf(PropTypes.string),
      tags: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    searchTerms: PropTypes.string.isRequired,
  }).isRequired,
};

export default SearchResults;
