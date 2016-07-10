import React, { Component } from 'react';
import { Link } from 'react-router';

import 'whatwg-fetch';

class Repos extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      repositories: []
    };
  }

  componentDidMount() {
    fetch('https://api.github.com/users/pro-react/repos')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        repositories: responseData
      });
    });
  }

  render() {
    let repos = this.state.repositories.map((repo) => (
      // <li key={repo.id}>{repo.name}</li>
      <li key={repo.id}>
        <Link to={"/repos/details/"+repo.name}>{repo.name}</Link>
      </li>
    ));

    console.log('children=', this.props.children);

    let child = this.props.children && React.cloneElement(this.props.children, {
      respositories: this.state.repositories
    });

    return (
      <div>
        <h1>Github Repos</h1>
        <ul>
          {repos}
        </ul>
        {child}
      </div>
    );
  }
}

export default Repos;
