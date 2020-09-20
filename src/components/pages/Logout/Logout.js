import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import API from '../../../api';
import SELECTORS from '../../../redux/selectors';

const Logout = ({ token, onLogout }) => {

  useEffect(() => onLogout(token), [onLogout, token]);

  return null;
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: SELECTORS.user.getToken(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: (token) => dispatch(API.user.logout(token)),
});
 
export default connect(mapStateToProps, mapDispatchToProps)(Logout);