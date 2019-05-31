import React, { Component, Fragment } from 'react'
import ingredientsData from '../data/ingredients.json'
import List from './components/list'
import Autosuggest from 'react-autosuggest'

const data = ingredientsData.ingredients

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : data.filter(ingred =>
    ingred.name.toLowerCase().slice(0, inputLength) === inputValue
  )
}

const getSuggestionValue = suggestion => suggestion.name

const renderSuggestion = suggestion => (
  <Fragment>
    {suggestion.name}
  </Fragment>
)

class SkyrimIngredientsApp extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      suggestions: []
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  render() {
    const {
      value,
      suggestions
    } = this.state

    const inputProps = {
      placeholder: 'Enter effect',
      value,
      onChange: this.onChange
    }

    return (
      <div className="container">
        <div className="grid">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          <List data={ingredientsData} />
        </div>
      </div>
    )
  }
}

export default SkyrimIngredientsApp
