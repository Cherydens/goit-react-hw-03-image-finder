import { Component } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    searchQuerry: '',
  };

  onSearchQuerryChange = e => {
    this.setState({ searchQuerry: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.searchQuerry.trim()) {
      toast.error("Sorry, your search query can't be empty. Please try again.");
      return;
    }
    this.props.onSubmit(this.state.searchQuerry.toLowerCase().trim());
    this.setState({ searchQuerry: '' });
  };

  render() {
    const { onSubmit, onSearchQuerryChange } = this;
    const { searchQuerry } = this.state;

    return (
      <Header>
        <SearchForm onSubmit={onSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuerry}
            onChange={onSearchQuerryChange}
          />
        </SearchForm>
      </Header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
