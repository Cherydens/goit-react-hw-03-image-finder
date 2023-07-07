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
    showLoader: false,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuerry, page } = this.state;
    const prevSearchQuerry = prevState.searchQuerry;
    const prevPage = prevState.page;

    const isNewSearchQuerry = searchQuerry !== prevSearchQuerry;
    const isNextPage = page !== prevPage;

    if (isNextPage || isNewSearchQuerry) {
      this.getImages();
    }
  }

  getImages = async () => {
    const { searchQuerry, page } = this.state;
    try {
      this.setState({ showLoader: true });
      const { totalHits, hits } = await pixabayApiService({
        searchQuerry,
        page,
        IMAGES_PER_PAGE,
      });

      if (!totalHits) {
        toast.error(
          `Sorry, there are no images matching your search query: ${searchQuerry}. Please try again. `
        );
        return;
      }

      this.setState(({ searchResults }) => ({
        searchResults: [...searchResults, ...hits],
        totalHits: totalHits,
      }));
    } catch ({ message }) {
      toast.error(`Ooops! Something went wrong: "${message}"`);
    } finally {
      this.setState({ showLoader: false });
    }
  };

  onFormSubmit = searchQuerry => {
    if (this.state.searchQuerry === searchQuerry) {
      toast.error(
        `Sorry, your previos search query was "${searchQuerry}". Please try again.`
      );
      return;
    }
    this.setState({
      searchQuerry,
      searchResults: [],
      totalHits: 0,
      page: 1,
    });
  };

  onLoadMoreBtnClick = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { showLoader, page, searchResults, totalHits } = this.state;
    const { onFormSubmit, onLoadMoreBtnClick } = this;

    const totalPages = Math.ceil(totalHits / IMAGES_PER_PAGE);
    const showImageGallery = !!searchResults.length;
    const showLoadMoreBtn = !showLoader && totalPages > 1 && page < totalPages;

    return (
      <Container>
        <Searchbar onSubmit={onFormSubmit} />
        {showImageGallery && <ImageGallery searchResults={searchResults} />}
        {showLoader && <Loader />}
        {showLoadMoreBtn && <Button onBtnClick={onLoadMoreBtnClick} />}
        <Toaster position="top-right" reverseOrder={false} />
      </Container>
    );
  }
}
