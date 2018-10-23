import React from 'react'
import moment from 'moment'
import { displayHeaderAndFooterInIframe } from '../../utils/utils'

export const Footer = () => {
  const displayFooter = displayHeaderAndFooterInIframe()

  const footer = (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">
          <a href="/">Home</a> - {moment().format('YYYY')} All rights reserved.
        </p>
      </div>
    </footer>
  )

  return displayFooter ? footer : null
}
