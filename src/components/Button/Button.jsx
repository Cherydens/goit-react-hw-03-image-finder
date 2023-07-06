import PropTypes from 'prop-types';

import { LoadMoreBtn } from './Button.styled';

const Button = ({ onBtnClick }) => (
  <LoadMoreBtn type="button" onClick={onBtnClick}>
    Load more
  </LoadMoreBtn>
);

export default Button;

Button.propTypes = {
  onBtnClick: PropTypes.func.isRequired,
};
