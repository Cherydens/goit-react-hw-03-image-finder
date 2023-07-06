import { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal/Modal';

import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  componentDidUpdate() {
    const { isModalOpen } = this.state;
    const { handleKeyDown } = this;
    !!isModalOpen && window.addEventListener('keydown', handleKeyDown);
    !isModalOpen && window.removeEventListener('keydown', handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.closeModal();
    }
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = e => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props.imageCard;
    return (
      <GalleryItem>
        <GalleryItemImage
          src={webformatURL}
          alt={tags}
          onClick={this.openModal}
        />
        {this.state.isModalOpen && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClose={this.closeModal}
          />
        )}
      </GalleryItem>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  imageCard: PropTypes.shape({
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
};
