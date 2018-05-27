// @flow

import Top from './pages/Top'
import SignUp from './pages/SignUp'
import withColumnsHerfCenter from './templates/withColumHerfCenter'

export default {
  routes: [
    {
      path: '/',
      component: Top,
      exact: true,
    },
    {
      path: '/users/sign_up',
      component: withColumnsHerfCenter(SignUp),
      exact: true,
    },
  ],
}
