import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { ModalImg, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ largeImageURL, tags, onClose }) =>
  createPortal(
    <Overlay
      onClick={e => {
        if (e.currentTarget === e.target) {
          onClose(e);
        }
      }}
    >
      <ModalImg src={largeImageURL} alt={tags} />
    </Overlay>,
    modalRoot
  );

export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
