import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Portal = ({ domId, children }) => {
  const domEl = document.getElementById(domId);

  return ReactDOM.createPortal(
    children,
    domEl
  );
}

Portal.propTypes = {
  domId: PropTypes.string.isRequired,
};
 
export default Portal;