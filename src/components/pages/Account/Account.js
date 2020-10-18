import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AccountNav from './components/AccountNav';
import AccountSettings from '../AccountSettings';
import AccountStats from '../AccountStats';
import AccountVisits from '../AccountVisits';
import AccountUpdate from '../../features/AccountUpdate';
import PasswordUpdate from '../../features/PasswordUpdate';

import SELECTORS from '../../../redux/selectors';
import ACTION_CREATORS from '../../../redux/actionCreators';

const Account = ({ token, login, onSetUserData  }) => {
  return ( 
    <div className="m-top-xxl">
      <AccountNav />
      <Switch>
        <Route path="/account" exact>
          <AccountStats />
        </Route>
        <Route path="/account/visits" exact>
          <AccountVisits />
        </Route>
        <Route path="/account/settings" exact>
          <AccountSettings 
            token={token}
            login={login}
          />
        </Route>
        <Route path="/account/settings/update" exact>
          <AccountUpdate 
            token={token}
            login={login}
            onUpdateUserData={onSetUserData}
          />
        </Route>
        <Route path="/account/settings/pswd" exact>
          <PasswordUpdate 
            token={token}
          />
        </Route>
      </Switch>
    </div>
  );
}

Account.propTypes = {
  token: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  onSetUserData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ 
  token: SELECTORS.user.getToken(state),
  login: SELECTORS.user.getLogin(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSetUserData: (userData) => dispatch(ACTION_CREATORS.user.setUserData({ user: userData })),
});
 
export default connect(mapStateToProps, mapDispatchToProps)(Account);