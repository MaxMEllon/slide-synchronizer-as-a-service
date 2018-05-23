import React from 'react'

export default {
  routes: [
    {
      path: '/',
      component: () => <div>home</div>,
      exact: true,
    },
    {
      path: '/users/sign_in',
      component: () => <div>sign in</div>,
      exact: true,
    },
  ],
}
