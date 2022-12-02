# Development

### Link to Deployed Website
If you used the stencil code, this is `https://happysifaka123.github.io/cs1300-development-homework`


### Goal and Value of the Application
The goal of this application is to help the user place online orders from My Bakery. To do so, the application allows the user to browse items sold at My Bakery, filter and sort the items as desired, and add the items to the cart. This application is valuable to the user, because it allows the user to check out items sold at My Bakery at anywhere in the world with internet access.


### Usability Principles Considered
To enable the user to view specific items that suit their preferences, the application allows the user to filter items based on what the item's type is and whether it is a seasonal item sold only during a limited period of time.

The application also allows the user to sort the listed items based on price (low to high) and review (high to low) to help users purchase cheaper items and/or highly rated items. The user can visualize items they added to the cart in the "Cart" section and keep track of the total cost of items they selected. The user can remove items from the cart by simply clicking the "Remove" button next to each item.

All sections where the user can specify sorting and filter categories are highlighted with larger texts, and in case the user wants to revert the listed items to their original state, the user can click the "Reset All Filters" button to do so.

To help users distinguish sections on the applications (e.g., sorting and filtering, cart, items listed), the website uses backgrounds with different colors.


### Organization of Components
I have two components, BakeryItem and CartItem. BakeryItem is an item that is listed on the website, and CartItem is an item that the user added to their cart. A BakeryItem has an image an item, along with information about the item and a button that allows the uer to add the item to their cart. A CartItem has the name and the price of the item added and a button that allows the user to remove the item from the cart. Each of those two components takes properties of certain items initially derived from a json file and a function that needs to be executed when the user clicks a button in the component.


### How Data is Passed Down Through Components
Once the app is initialized, data representing properties of each item in bakery-data.json are used to create their corresponding BakeryItem components. A BakeryItem component takes these as props: 
    1. Properties (item image, name, type, review, price, and boolean value indicating whether the item is a seasonal item) derived from bakery-data.json and used to populate item information accordingly.
    2. An update function, which allows the user to add an item to the cart.

When the user adds an item to the cart, a CartItem component is created. A CartItem component takes these as props:
    1. Properties (item name and price) derived from bakery-data.json and used to populate item information accordingly.
    2. An update function, which allows the user to remove an item from the cart.


### How the User Triggers State Changes
The user can trigger state changes by clicking checkboxes to apply different filters or selecting different sorting categories in a dropdown menu for sorting. They can also reset the state of the two filters to their original states by clicking the "Reset All Filters" button.
