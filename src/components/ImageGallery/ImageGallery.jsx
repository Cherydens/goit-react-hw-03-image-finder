import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ searchResults }) => {
  return (
    searchResults && (
      <Gallery>
        {searchResults.map((imageCard, index) => (
          <ImageGalleryItem key={index} imageCard={imageCard} />
        ))}
      </Gallery>
    )
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  searchResults: PropTypes.array.isRequired,
};
