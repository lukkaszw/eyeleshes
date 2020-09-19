import AuthForm from '../AuthForm';
import { connect } from 'react-redux';
import API from '../../../api';
import ACTION_CREATORS from '../../../redux/actionCreators';

const mapStateToProps = () => ({
  apiAction: API.user.signIn,
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: ({ token, user}) => dispatch(ACTION_CREATORS.user.login({ token, user })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);