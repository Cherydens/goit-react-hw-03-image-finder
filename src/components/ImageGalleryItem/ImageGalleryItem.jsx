import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({
  imageCard: { webformatURL, largeImageURL, tags },
}) => (
  <GalleryItem>
    <GalleryItemImage src={webformatURL} alt={tags} />
  </GalleryItem>
);

export default ImageGalleryItem;
