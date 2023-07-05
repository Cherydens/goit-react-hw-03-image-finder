import { ThreeDots } from 'react-loader-spinner';

const Loader = () => (
  <ThreeDots
    height="80"
    width="80"
    radius="9"
    color="#3f51b5"
    ariaLabel="three-dots-loading"
    wrapperStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
    wrapperClassName=""
    visible={true}
  />
);

export default Loader;
