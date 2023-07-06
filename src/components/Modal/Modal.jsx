import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { ModalImg, Overlay } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tags, onClose } = this.props;

    return createPortal(
      <Overlay
        onClick={e => {
          if (e.currentTarget === e.target) {
            onClose();
          }
        }}
      >
        <ModalImg src={largeImageURL} alt={tags} />
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
