import { ModalImg, Overlay } from './Modal.styled';

const Modal = ({ largeImageURL, tags }) => (
  <Overlay>
    <ModalImg src={largeImageURL} alt={tags} />
  </Overlay>
);

export default Modal;
