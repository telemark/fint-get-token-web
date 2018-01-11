import React from 'react'
import getToken from '../lib/get-token'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit (e) {
    e.preventDefault()
    const options = {
      url: 'https://namidp01.rogfk.no/nidp/oauth/nam/token',
      credentials: {
        client: {
          client_id: this.refs.clientId.value,
          client_secret: this.refs.clientSecret.value
        },
        auth: {
          username: this.refs.username.value,
          password: this.refs.password.value,
          grant_type: 'password'
        }
      }
    }
    try {
      const { access_token: token } = await getToken(options)
      console.log(token)
      this.setState({ token })
    } catch (e) {
      console.log(e)
    }
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='box'>
            <div>
              <p>Client ID:</p>
              <p>Client Secret:</p>
              <p>Username:</p>
              <p>Password:</p>
            </div>
            <div>
              <p><input ref='clientId' type='text' /></p>
              <p><input ref='clientSecret' type='text' /></p>
              <p><input ref='username' type='text' /></p>
              <p><input ref='password' type='text' /></p>
              <p><input type='submit' value='Get token' /></p>
            </div>
          </div>
        </form>
        { this.state.token &&
          <pre>{this.state.token}</pre>
        }
        <style jsx>
          {`
          pre {
            background-color: #ebf1f5;
            font-family: monospace;
            border: 1px solid #bbccdd;
            word-wrap: break-word;
            white-space: pre-wrap;
          }
          .box {
            display: grid;
            width: 100%;
            grid-template-columns: 10vh auto;
            grid-column-gap: 10px;
          }
        `}
        </style>
      </div>
    )
  }
}
