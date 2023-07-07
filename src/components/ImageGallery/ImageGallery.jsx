import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ searchResults }) => {
  return (
    searchResults && (
      <Gallery>
        {searchResults.map(({ id, ...restProps }) => (
          <ImageGalleryItem key={id} imageCard={restProps} />
        ))}
      </Gallery>
    )
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired })
  ).isRequired,
};
