import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { ModalImg, Overlay } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {
    e.code === 'Escape' && this.props.onClose();
  };

  onBackdropClick = e => {
    e.currentTarget === e.target && this.props.onClose();
  };

  render() {
    const { largeImageURL, tags } = this.props;
    const { onBackdropClick } = this;

    return createPortal(
      <Overlay onClick={onBackdropClick}>
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
