import * as React from "react"

import Layout from "../components/layout"
import Contact from "../components/contact"

type ContactPageProps = {
  location: Location
}

export const ContactPage = ({ location }: ContactPageProps) => (
  <Layout location={location} title={`Contact me`} className="contact">
    <Contact />
  </Layout>
)

export default ContactPage
