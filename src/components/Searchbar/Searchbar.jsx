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

  handleSearchQuerryChange = e => {
    this.setState({ searchQuerry: e.target.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (!this.state.searchQuerry.trim()) {
      toast.error("Sorry, your search query can't be empty. Please try again.");
      return;
    }
    this.props.onSubmit(this.state.searchQuerry.trim());
    this.setState({ searchQuerry: '' });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuerry}
            onChange={this.handleSearchQuerryChange}
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
