import React, { Component, Fragment } from 'react'
import ingredientsData from '../data/ingredients.json'
import List from './components/list'
import Autosuggest from 'react-autosuggest'

const data = ingredientsData.ingredients

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  const filteredList = data.filter((e) => {
    const filteredEffects = e.effects.filter((effects) => {
      return effects.toLowerCase().slice(0, inputLength) === inputValue
    })
    return filteredEffects.length > 0 && e
  })

  return inputLength === 0 ? [] : filteredList
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
          <div className="col-12">
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
          </div>
          <List data={ingredientsData} />
        </div>
      </div>
    )
  }
}

export default SkyrimIngredientsApp
