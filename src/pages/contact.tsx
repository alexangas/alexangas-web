import * as React from 'react'

import Layout from "../components/layout"
import Contact from "../components/contact"

export const ContactPage = ({location}) => (
      <Layout location={location} title={`Contact me`} className="contact">
          <Contact />
      </Layout>
    )

export default ContactPage
