import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';

import pixabayApiService from 'services/pixabayApiService';

import { Container } from './App.styled';

const IMAGES_PER_PAGE = 12;

export class App extends Component {
  state = {
    searchQuerry: '',
    searchResults: [],
    totalHits: 0,
    page: 1,
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuerry, page } = this.state;
    const prevSearchQuerry = prevState.searchQuerry;
    const prevPage = prevState.page;
    const isNewSearchQuerry = searchQuerry !== prevSearchQuerry;
    const isNextPage = page !== prevPage;

    isNewSearchQuerry &&
      this.setState({ searchResults: [], totalHits: 0, page: 1 });

    if (isNextPage || isNewSearchQuerry) {
      this.setState({ isLoading: true });

      try {
        const data = await pixabayApiService({
          searchQuerry,
          page,
          IMAGES_PER_PAGE,
        });

        if (!data.totalHits) {
          toast.error(
            `Sorry, there are no images matching your search query: ${searchQuerry}. Please try again. `
          );
          this.setState({ isLoading: false });
          return;
        }

        this.setState(({ searchResults }) => ({
          searchResults: [...searchResults, ...data.hits],
          totalHits: data.totalHits,
          isLoading: false,
        }));
      } catch (error) {
        toast.error(`Ooops! Something went wrong: "${error.message}"`);
        this.setState({ isLoading: false });
      }
    }
  }

  handleFormSubmit = searchQuerry => {
    this.setState({ searchQuerry });
  };

  calculateTotalPages(totalHits, perPage) {
    return Math.ceil(totalHits / perPage);
  }

  onLoadMoreBtnClick = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { isLoading, page, searchResults, totalHits } = this.state;

    const totalPages = this.calculateTotalPages(totalHits, IMAGES_PER_PAGE);

    const isRenderLoadMoreBtn =
      !isLoading && totalPages > 1 && page < totalPages;

    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchResults={searchResults} />
        {isLoading && <Loader />}
        {isRenderLoadMoreBtn && (
          <Button handleClick={this.onLoadMoreBtnClick} />
        )}
        <Toaster position="top-right" reverseOrder={false} />
      </Container>
    );
  }
}
