import { LoadMoreBtn } from './Button.styled';

const Button = ({ handleClick }) => (
  <LoadMoreBtn type="button" onClick={handleClick}>
    Load more
  </LoadMoreBtn>
);

export default Button;
