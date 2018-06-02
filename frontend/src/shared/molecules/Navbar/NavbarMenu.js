import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <div id="navbar" className="navbar-menu">
    <div className="navbar-start">
      <Link to="/" className="navbar-item">Home</Link>
    </div>
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="field is-grouped">
          <p className="control">
            <span>Login</span>
          </p>
        </div>
      </div>
    </div>
  </div>
)
