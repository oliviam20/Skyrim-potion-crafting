This app is deployed to [https://skyrimpotionsengine.netlify.com](https://skyrimpotionsengine.netlify.com/)

This is dependant on [React Autosuggest](https://github.com/moroshko/react-autosuggest).

This app was created to be a companion to the video game [The Elder Scrolls V Skyrim](https://elderscrolls.bethesda.net/en/skyrim). The player can make potions by combining the correct ingredients. To do so, the player will need ingredients with at least one identical property (effects). For example, to brew a 'Restore health' potion, the ingredients (e.g. blisterwort and wheat) must have the 'restore health' property.

To use the app, click on any effect/ingredient on the list or type the desired effect/ingredient in the search bar and the app will filter the results as you type.

## Example

If you type/click `restore health`, the list will return the ingredients.
![effect](https://res.cloudinary.com/dwfzniyyh/image/upload/v1575086814/skyrim%20potions%20engine/effect.png)

If you type/click `wheat`, the list will return the effects of that ingredient.
![ingredient](https://res.cloudinary.com/dwfzniyyh/image/upload/v1575086807/skyrim%20potions%20engine/ingredient.png)

## Development Notes

Styles development are in scss. Scss files are live compiled during development with [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass).
