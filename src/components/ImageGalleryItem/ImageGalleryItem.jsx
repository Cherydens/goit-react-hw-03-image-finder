import { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal/Modal';

import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props.imageCard;
    const { showModal } = this.state;
    const { toggleModal } = this;

    return (
      <GalleryItem>
        <GalleryItemImage src={webformatURL} alt={tags} onClick={toggleModal} />
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClose={toggleModal}
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
