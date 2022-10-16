import {Component} from 'react'

import {v4} from 'uuid'

import './App.css'

class App extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordsList: [],
    searchInput: '',
    isChecked: false,
    count: 0,
  }

  submitFrom = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state

    const newPasswordItem = {
      id: v4(),
      websiteName: websiteInput,
      username: usernameInput,
      password: passwordInput,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPasswordItem],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))

    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickCheckbox = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  onClickDelete = id => {
    console.log(id)
  }

  renderPasswordList = () => {
    const {passwordsList, searchInput, isChecked} = this.state
    const searchResults = passwordsList.filter(password =>
      password.username.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const length2 = searchResults.length

    if (length2 !== 0) {
      return (
        <ul className="list-container">
          {searchResults.map(result => (
            <li key={result.id} className="list-item-container">
              <div className="user-icon">
                <p className="icon">{result.username[0]}</p>
              </div>

              <div>
                <p className="icon">{result.websiteName}</p>
                <p className="icon">{result.username}</p>
                {isChecked ? (
                  <p className="icon">{result.password}</p>
                ) : (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                    alt="stars"
                    className="stars-image"
                  />
                )}
              </div>
              <button
                type="button"
                className="delete-icon-btn"
                onClick={this.onClickDelete}
                testid="delete"
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                  alt="delete"
                  className="delete-icon"
                />
              </button>
            </li>
          ))}
        </ul>
      )
    }

    return (
      <div className="no-password-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
          className="no-password-image"
        />
        <p className="no-passwords-heading">No Passwords</p>
      </div>
    )
  }

  render() {
    const {
      usernameInput,
      websiteInput,
      passwordInput,
      passwordsList,
      count,
    } = this.state
    console.log(count)

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="add-new-password-container">
          <div className="new-password-card">
            <h1 className="new-password-heading">Add New Password</h1>
            <form className="from-container" onSubmit={this.submitFrom}>
              <div className="input-website-input">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="website-logo"
                />
                <input
                  type="text"
                  className="input-website-name"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsite}
                  value={websiteInput}
                />
              </div>
              <div className="input-website-input">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="website-logo"
                />
                <input
                  type="text"
                  className="input-website-name"
                  placeholder="Enter Username"
                  onChange={this.onChangeUsername}
                  value={usernameInput}
                />
              </div>
              <div className="input-website-input">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="website-logo"
                />
                <input
                  type="password"
                  className="input-website-name"
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                  value={passwordInput}
                />
              </div>
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-image"
          />
        </div>
        <div className="add-new-password-list-container">
          <div className="header-search-element-container">
            <div className="counting-passwords-container">
              <h1 className="your-password-heading">Your Passwords</h1>
              <div className="counter">
                <p className="count">{count}</p>
              </div>
            </div>

            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearch}
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkbox-input"
              className="checkbox"
              onClick={this.onClickCheckbox}
            />
            <label htmlFor="checkbox-input" className="show-password-heading">
              Show Passwords
            </label>
          </div>
          {this.renderPasswordList()}
        </div>
      </div>
    )
  }
}

export default App
