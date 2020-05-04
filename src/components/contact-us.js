import React from 'react'
import axios from 'axios'

class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasSubmitted: false
        };
    
        // This binding is necessary to make `this` work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        let status = '';
        if (this.state.type && this.state.message) {
            const classString = 'alert alert-' + this.state.type;
            status = <p id="contactStatus" className={classString}>
                {this.state.message}
            </p>;
        }
        return (
            <div id="contact-us" className="container">
                <header className="major">
                    <h2>Contact us</h2>
                </header>
                <p>If you have a software project that could benefit from our expertise, please let us know.</p>
                {status}
                <form id="contactForm" method="POST" onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" required minLength="3" maxLength="254" />
                    <label htmlFor="email">E-mail address:</label>
                    <input type="email" name="email" required minLength="3" maxLength="254" />
                    <label htmlFor="tel">Phone (optional):</label>
                    <input type="tel" name="tel" minLength="11" maxLength="20" />
                    <label htmlFor="text">Project details:</label>
                    <textarea name="text" required minLength="10" maxLength="5000" rows="5" />
                    <button type="submit" className="button special" disabled={this.state.hasSubmitted}>Send</button>
                </form>
            </div>
        )
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ type: 'info', message: 'Sending...', hasSubmitted: true }, this.sendFormData);
    }

    sendFormData() {
        const formAction = "https://getform.io/f/e731342f-c998-42c5-b994-14534e42f5dc";
        const form = document.querySelector('#contactForm');
        const name = form.querySelector('[name="name"]').value;
        const email = form.querySelector('[name="email"]').value;
        const tel = form.querySelector('[name="tel"]').value;
        const text = form.querySelector('[name="text"]').value;
        const button = form.querySelector('button');
        const _this = this;
        axios.post(formAction, {
            name,
            email,
            tel,
            text
          })
          .then(function () {
              button.textContent = "Sent!";
              _this.setState({ type: 'success', message: 'Thanks for your message!' });
          })
          .catch(function (error) {
              _this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
              console.error(error);
          });
    }
}

export default ContactUs
