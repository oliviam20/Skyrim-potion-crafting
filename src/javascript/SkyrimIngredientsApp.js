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

const getSuggestionValue = suggestion => suggestion.name

class SkyrimIngredientsApp extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      suggestions: effectsArr
    }
  }

  getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase()

  const filteredList = data.filter((e) => {
    const filteredEffects = e.effects.filter((effects) => {
      return effects.toLowerCase().trim() === inputValue
    })
    return filteredEffects.length > 0 && e
  })

  // sort list in alphabetical order
  filteredList.sort((a, b) => {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()
    return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0
  })

  // if input is effect, return ingredient list
  if (effectsArr.some(effect => effect.name.toLowerCase() === inputValue)) {
    return filteredList
  }

  // if input is ingredient, return effect list for that ingredient
  const ingredientName = data.find(e => e.name.toLowerCase() === inputValue)
  if (ingredientName) {
    return ingredientName.effects.map(effect => ({ 'name': effect }))
  }

  // default rendered list
  return effectsArr
}

  renderSuggestion = suggestion => (
    <Fragment>
      {suggestion.name}
    </Fragment>
  )

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  render() {
    const {
      value,
      suggestions
    } = this.state

    const inputProps = {
      placeholder: 'Enter effect or ingredient',
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

    const wrapperStyles = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    };

    const autoSuggestWrapperStyle = {
      width: '320px'
    };

    return (
      <div style={wrapperStyles}>
        <form style={{ marginTop: '1rem' }} action="https://www.paypal.com/donate" method="post" target="_top">
          <input type="hidden" name="hosted_button_id" value="H4CSD24TH6V8S" />
          <input type="image" src="https://www.paypalobjects.com/en_AU/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
          <img alt="" border="0" src="https://www.paypal.com/en_AU/i/scr/pixel.gif" width="1" height="1" />
        </form>
        <p style={{ textAlign: 'center' }}>Thanks for using Skyrim Potions Engine! If you found it useful, please consider donating a small amount <span aria-label="smiley face" role="img">😊</span></p>
        <div style={autoSuggestWrapperStyle}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            alwaysRenderSuggestions
            theme={theme}
          />
        </div>
      </div>
    )
  }
}

export default SkyrimIngredientsApp
