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

const Account = ({ token, login  }) => {
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
          />
        </Route>
        <Route path="/account/settings/update" exact>
          <AccountUpdate 
            token={token}
            login={login}
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
};

const mapStateToProps = (state) => ({ 
  token: SELECTORS.user.getToken(state),
  login: SELECTORS.user.getLogin(state),
});
 
export default connect(mapStateToProps)(Account);