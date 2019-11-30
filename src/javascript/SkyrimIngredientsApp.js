import React, { Component, Fragment } from 'react'
import ingredientsData from '../data/ingredients.json'
import Autosuggest from 'react-autosuggest'

const data = ingredientsData.ingredients

const initialData = data.map(e => e.effects)
const mergedEffects = [].concat.apply([], initialData)
const uniqueEffects = [...new Set(mergedEffects)]
uniqueEffects.sort()
const effectsArr = []
uniqueEffects.forEach(e => effectsArr.push({ name: e }))

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  const filteredList = data.filter((e) => {
    const filteredEffects = e.effects.filter((effects) => {
      return effects.toLowerCase().slice(0, inputLength) === inputValue
    })
    return filteredEffects.length > 0 && e
  })

  filteredList.sort((a, b) => {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()
    return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0
  })
  return inputLength === 0 ? effectsArr : filteredList
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
      suggestions: effectsArr
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

  render() {
    const {
      value,
      suggestions
    } = this.state

    const inputProps = {
      placeholder: 'Enter effect',
      value,
      onChange: this.onChange,
    }

    const theme = {
      input: {
        padding: '10px 20px',
        borderRadius: '4px',
        width: '85%',
        border: '1px solid #aaa',
        background: 'transparent',
        fontSize: '16px'
      },
      inputFocused: {
        outline: 'none'
      },
      suggestionsContainer: {
        padding: '1rem'
      },
      suggestionsList: {
        padding: '0'
      },
      suggestion: {
        listStyle: 'none',
        padding: '0.3rem',
      },
      suggestionHighlighted: {
        cursor: 'pointer'
      }
    }

    return (
      <div className="container">
        <div className="grid justify-center">
          <div className="col-12 col-sm-6">
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              alwaysRenderSuggestions
              theme={theme}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SkyrimIngredientsApp
