import { Component } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

import * as API from 'services/pixabayApiService';

import { Gallery } from './ImageGallery.styled';

class ImageGallery extends Component {
  state = {
    searchResults: [],
    totalHits: 0,
    page: 1,
    totalPages: 0,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    // New search querry

    const prevSearch = prevProps.searchQuerry;
    const currentSearch = this.props.searchQuerry;

    if (prevSearch !== currentSearch) {
      this.setState({ isLoading: true, page: 1, searchResults: [] });
      API.searchParams.q = currentSearch;
      API.searchParams.page = page;

      try {
        const data = await API.pixabayApiService(API.searchParams);

        if (!data.totalHits) {
          toast.error(
            `Sorry, there are no images matching your search query: ${currentSearch}. Please try again. `
          );
          this.setState({ isLoading: false });
          return;
        }

        this.setState({
          searchResults: data.hits,
          totalHits: data.totalHits,
          totalPages: this.calculateTotalPages(
            data.totalHits,
            API.searchParams.per_page
          ),
          isLoading: false,
        });
      } catch (error) {
        console.error(error);
        toast.error('Ooops! Something went wrong!');
        this.setState({ isLoading: false });
      }
    }

    // Pagination

    const prevPage = prevState.page;
    const currentPage = page;

    if (prevPage < currentPage) {
      this.setState({ isLoading: true });
      API.searchParams.page = currentPage;

      try {
        const data = await API.pixabayApiService(API.searchParams);

        this.setState(({ searchResults }) => ({
          searchResults: [...searchResults, ...data.hits],
          isLoading: false,
        }));
      } catch (error) {
        console.error(error);
        toast.error('Ooops! Something went wrong!');
        this.setState({ isLoading: false });
      }
    }
  }

  calculateTotalPages(totalHits, perPage) {
    return Math.ceil(totalHits / perPage);
  }

  onLoadMoreBtnClick = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { searchResults, isLoading, totalPages, page } = this.state;

    return (
      <>
        {searchResults && (
          <Gallery>
            {searchResults.map((imageCard, index) => (
              // Use Index because repeated Id from backend
              <ImageGalleryItem key={index} imageCard={imageCard} />
            ))}
          </Gallery>
        )}
        {isLoading && <Loader />}
        {!isLoading && totalPages > 1 && page < totalPages && (
          <Button handleClick={this.onLoadMoreBtnClick} />
        )}
      </>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  searchQuerry: PropTypes.string.isRequired,
};
