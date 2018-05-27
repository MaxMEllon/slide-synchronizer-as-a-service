// @flow

import Top from './pages/Top'
import SignUp from './pages/SignUp'
import Common from './templates/Common'

export default {
  routes: [
    {
      path: '/',
      component: Top,
      exact: true,
    },
    {
      path: '/users/sign_up',
      component: Common(SignUp),
      exact: true,
    },
  ],
}
