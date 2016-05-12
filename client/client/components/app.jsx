import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';

export default class AppComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null,
      movies: []
    }
  }

  componentWillMount() {
    axios.get('http://localhost:5000/get_movies')
      .then(function (response) {
        // console.log(response.data.movies);
        this.setState({
          movies: response.data.movies
        })
      }.bind(this))
      .catch(function (response) {
        console.log(response);
      });
  }

  renderRow(row, key) {
    return <div className="item" key={key}>
      <div className="image">
        <img src={row.cover_image} />
      </div>
      <div className="content">
        <a className="header">{row.title}</a>
        <div className="meta">
          <span>{row.description}</span>
        </div>
        <div className="description">
          <p></p>
        </div>
        <div className="extra">
          Additional Details
        </div>
      </div>
    </div>
  }

  render() {
    let loader = this.state.movies.length ? '' : 'active';
    let loaderClasses = `ui ${loader} inverted dimmer`;

    return (
      <div>
        <div className="ui menu">
          <div className="header item">
            Movies: Coming Soon
          </div>
          <a className="right item">
            Login
          </a>
        </div>
        <div style={{'margin': '0 auto','width': '900px'}}>
          <div className="ui segment">
            <div className={loaderClasses}>
              <div className="ui text loader">Loading</div>
            </div>
            <div className="ui items">
              {this.state.movies.map(this.renderRow)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}