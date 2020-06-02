import * as React from "react"
import axios, { AxiosError, AxiosResponse } from "axios"
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa"
import clsx from "clsx"

type ContactState = {
  isSubmitting: boolean
  hasSubmitted: boolean
  type: string
  message: string
}

class Contact extends React.Component<unknown, ContactState> {
  state: ContactState = {
    isSubmitting: false,
    hasSubmitted: false,
    type: ``,
    message: ``,
  }

  render = (): JSX.Element => (
    <>
      <form id="contactForm" method="POST" onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="name">
            Name:
          </label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="text"
              id="name"
              name="name"
              required
              minLength={3}
              maxLength={254}
            />
            <span className="icon is-small is-left">
              <FaUser />
            </span>
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="email">
            E-mail address:
          </label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="email"
              id="email"
              name="email"
              required
              minLength={3}
              maxLength={254}
            />
            <span className="icon is-small is-left">
              <FaEnvelope />
            </span>
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="tel">
            Phone (optional):
          </label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="tel"
              id="tel"
              name="tel"
              minLength={11}
              maxLength={20}
            />
            <span className="icon is-small is-left">
              <FaPhone />
            </span>
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="text">
            Message:
          </label>
          <div className="control">
            <textarea
              className="textarea"
              id="text"
              name="text"
              required
              minLength={10}
              maxLength={5000}
              rows={5}
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button
              className={clsx(
                `button`,
                `is-primary`,
                this.state.isSubmitting && `is-loading`
              )}
              type="submit"
              disabled={this.state.hasSubmitted}
            >
              Send
            </button>
          </div>
          <div className="control">
            <button
              className="button is-light"
              type="reset"
              disabled={this.state.hasSubmitted}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
      {this.state.type && (
        <div
          className={clsx(
            `notification`,
            `is-light`,
            this.state.type && `is-${this.state.type}`
          )}
        >
          {this.state.message}
        </div>
      )}
    </>
  )

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    this.setState({ isSubmitting: true, hasSubmitted: true }, this.sendFormData)
  }

  sendFormData = (): Promise<void | AxiosResponse<void>> => {
    const formAction = `https://getform.io/f/e731342f-c998-42c5-b994-14534e42f5dc`
    const form = document.querySelector(`#contactForm`) as HTMLElement
    const name = (form.querySelector(`[name="name"]`) as HTMLInputElement).value
    const email = (form.querySelector(`[name="email"]`) as HTMLInputElement)
      .value
    const tel = (form.querySelector(`[name="tel"]`) as HTMLInputElement).value
    const text = (form.querySelector(`[name="text"]`) as HTMLTextAreaElement)
      .value
    const button = form.querySelector(`button`) as HTMLButtonElement
    return axios
      .post(formAction, {
        name,
        email,
        tel,
        text,
      })
      .then(() => {
        button.textContent = `Sent!`
        this.setState({ type: `success`, message: `Thanks for your message!` })
      })
      .catch((error: AxiosError) => {
        this.setState({
          type: `danger`,
          message: `Sorry, there has been an error. Please try again later.`,
        })
        console.error(error)
      })
      .then(() => {
        this.setState({ isSubmitting: false })
      })
  }
}

export default Contact
