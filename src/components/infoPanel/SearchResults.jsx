import React from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlighter';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';
import { displaySelectedCartInfo } from '../../actions/carts';
import { filterMarkers } from '../../actions/map';
import './searchresults.scss';

const SearchResults = (props) => {
  const { handleShowCartInfo, handleFilterMarkers } = props;
  const { searchTerms } = props.filter;
  const { carts, tags } = props.filter.matches;

  function generateMatchList(matchArr, searchPhrase, headline) {
    // if the match array isn't empty, generate a list
    if (matchArr.length > 0) {
      let resultItems = [];

      if (headline === 'Carts') {
        resultItems = matchArr.map((cart) => {
          const highlighted = (<Highlight search={searchTerms} matchElement="span">{cart.name}</Highlight>);
          return (<button key={uniqueId()} onClick={() => handleShowCartInfo(cart.id)}>{highlighted}</button>);
        });
      } else {
        resultItems = matchArr.map((tag) => {
          const highlighted = (<Highlight search={searchTerms} matchElement="span">{tag}</Highlight>);
          return (<button key={uniqueId()} onClick={() => handleFilterMarkers(tag)}>{highlighted}</button>);
        });
      }

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

  function generateNoResultsMsg(tagsArr, cartsArr) {
    if ((tagsArr.length === 0) && (cartsArr.length === 0)) {
      return <p className="search-results__no-results">No search results found</p>;
    }
    return null;
  }

  return (
    <div className="search-results">
      { generateMatchList(carts, searchTerms, 'Carts') }
      { generateMatchList(tags, searchTerms, 'Tags') }
      { generateNoResultsMsg(tags, carts) }
    </div>
  );
};

SearchResults.propTypes = {
  filter: PropTypes.shape({
    matches: PropTypes.shape({
      carts: PropTypes.arrayOf(PropTypes.object),
      tags: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    searchTerms: PropTypes.string.isRequired,
  }).isRequired,
  handleShowCartInfo: PropTypes.func.isRequired,
  handleFilterMarkers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    filter: state.map.filter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleShowCartInfo: (id) => {
      dispatch(displaySelectedCartInfo(id));
    },
    handleFilterMarkers: (phrase) => {
      dispatch(filterMarkers(phrase, 'search'));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
