import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./BakeryItem";
import CartItem from "./CartItem"
import { useState } from "react";

// Load bakery data
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});



function App() {
  // Input data state
  const [currentBakeryData, setBakeryData] = useState(bakeryData);

  // Cart state
  const [cart, setCart] = useState([]);

  // Sort state
  const [selectedSortCategory, setSelectedSortCategory] = useState("default");

  // Item type filter state
  const [selectedFilterTypeCategories, setFilterTypeCategory] = useState([])

  // Seasonal item filter state
  const [seasonalItemChecked, setSeasonalItem] = useState(false)

  // Add items to cart
  function addToCart(item){
    setCart([...cart, item])
  }

  // Remove items from cart when the user clicks the Remove button next to an item
  function removeFromCart(item){
    const itemIdx = cart.indexOf(item)
    if (cart.length === 1){
      setCart([])
    }
    else{
      const updatedCart = [...cart]
      updatedCart.splice(itemIdx,1)
      setCart(updatedCart)
    }
  }

  // Sorting function
  // I referenced this post to write the following part: https://stackoverflow.com/questions/72172558/sort-render-an-array-of-objects-using-a-select-in-reactjs
  function sortBySelected(itemList, selectedSortCategory){
    if (selectedSortCategory === "review"){
      itemList.sort((a,b) =>{
        return b[selectedSortCategory] - a[selectedSortCategory];
      })
    }
    else{
      
      itemList.sort((a,b) =>{
        return a[selectedSortCategory] - b[selectedSortCategory];
      })
    }
    return itemList
  }
  
  // Apply sortBySelected upon category change
  function sortOptionChange(e){
    const selectedSortCategory = e.target.value
    if (selectedSortCategory !== "default"){
      var copiedBakeryData = [...currentBakeryData];

      // Call the sorting function to sort the data
      copiedBakeryData = sortBySelected(copiedBakeryData, selectedSortCategory)

      // Set the new sorting category
      setSelectedSortCategory(selectedSortCategory)

      // Set the newly sorted data
      setBakeryData(copiedBakeryData);
    }
  }


  // Filtering function for item type
  // I referenced this website to write the following function: https://www.geeksforgeeks.org/how-to-get-multiple-checkbox-values-in-react-js/
  function filterTypeOptionChange(e){
    const {value, checked} = e.target;
    var copiedBakeryData = [...bakeryData];

    // Sort copiedBakeryData if the currently selected sort category isn't default
    if (selectedSortCategory !== "default"){
      console.log("non-default sort category",selectedSortCategory)
      copiedBakeryData = sortBySelected(copiedBakeryData, selectedSortCategory)
    }

    if (checked) // item checked
    { 
      // Add the checked value to the list of selected types
      setFilterTypeCategory([...selectedFilterTypeCategories, value])

      // filter out items in copiedBakeryData whose types aren't in selectedFilterTypeCategories
      var filters = [...selectedFilterTypeCategories, value]
      var filteredData = copiedBakeryData.filter((elt) => filters.includes(elt.type))

      // Check if the user only wants to view seasonal menu items
      if (seasonalItemChecked)
      {
        filteredData = filteredData.filter(elt => elt.seasonal_menu)
        // console.log("seasonal item checked", filteredData)
      }

      // Re-render items with filtered data
      setBakeryData(filteredData);
    }
    else
    { // item unchecked
      
      // Check if the user only wants to view seasonal menu items
      if (seasonalItemChecked)
      {
        copiedBakeryData = copiedBakeryData.filter(elt => elt.seasonal_menu)
      }

      // Remove the unchecked item from selectedFilterTypeCategories
      var uncheckedValueIdx = selectedFilterTypeCategories.indexOf(value)
      var updatedFilters = [...selectedFilterTypeCategories]
      updatedFilters.splice(uncheckedValueIdx, 1)
      setFilterTypeCategory(updatedFilters)

      // Case 1: When the user unchecked all item types -> Show all items that satisfy the current filter/sorting conditions
      if (updatedFilters.length === 0)
      {
        setBakeryData(copiedBakeryData)
      }
      // Case 2: When some categories remain checked
      else
      {
        // Re-apply the item type filter with the updated filters  
        const filterdData = copiedBakeryData.filter((elt) => updatedFilters.includes(elt.type))
        setBakeryData(filterdData);
      }
    }
  }



  // Filtering function for seasonal menu items
  function filterSeasonalMenuChange(e){
    var copiedBakeryData = [...bakeryData]; 

    // Sort the copiedBakeryData if the currently selected sort category isn't default
    if (selectedSortCategory !== "default"){
      copiedBakeryData = sortBySelected(copiedBakeryData, selectedSortCategory)
    }

    const {value, checked} = e.target;
    if (checked){
      
      // Check if the user has any item type filters applied
      if (selectedFilterTypeCategories.length !== 0){
        copiedBakeryData = copiedBakeryData.filter((elt) => selectedFilterTypeCategories.includes(elt.type))
      }

      // filter out items in copiedBakeryData that aren't seasonal menu items
      const filterdData = copiedBakeryData.filter((elt) => elt.seasonal_menu === true)

      // set the seasonal item check status to true
      setSeasonalItem(true)

      // Re-render items with filtered data
      setBakeryData(filterdData);
    }
    else
    {
      // Check if the user has any item type filters applied
      if (selectedFilterTypeCategories.length !== 0){
        console.log("item type filter needed")
        copiedBakeryData = copiedBakeryData.filter((elt) => selectedFilterTypeCategories.includes(elt.type))
      }

      // set the seasonal item check status to false
      setSeasonalItem(false)

      // Re-render items
      setBakeryData(copiedBakeryData);
    }
  }



  function resetAllFilters(){
    setSeasonalItem(false)
    setFilterTypeCategory([])
    var copiedBakeryData = [...bakeryData]; 

    // Sort the copiedBakeryData if the currently selected sort category isn't default
    if (selectedSortCategory !== "default"){
      copiedBakeryData = sortBySelected(copiedBakeryData, selectedSortCategory)
    }
    setBakeryData(copiedBakeryData)

    // Uncheck all checkboxes (I referenced this post: https://stackoverflow.com/questions/8206565/check-uncheck-checkbox-with-javascript)
    for (const checkbox of document.querySelectorAll(".checkbox")){
      checkbox.checked = false;
    }

    // Reset all filters
    setSeasonalItem(false)
    setFilterTypeCategory([])
  }



  // App render
  return (
    <div className="App">
      <h1 class = "title">My Bakery</h1>

        <div class = "row sorts-and-filters">
          <div class = "col-3">
            <h2>Sort Categories</h2>
            <select value = {selectedSortCategory} onChange = {sortOptionChange}>
                <option value="default">Default</option>
                <option value="price">Price: Low to High</option>
                <option value="review">Review: High to Low</option>
            </select>
          </div>

          <div class = "col-3"> 
                <h2>Filter By Type</h2>
                <input name = "type" value = "drink" type = "checkbox" class = "checkbox" onChange = {filterTypeOptionChange}/><label>Drink</label><br></br>
                <input name = "type" value = "cookie" type = "checkbox" class = "checkbox" onChange = {filterTypeOptionChange}/><label>Cookie</label><br></br>
                <input name = "type" value = "pastry" type = "checkbox" class = "checkbox" onChange = {filterTypeOptionChange}/><label>Pastry</label><br></br>
                <input name = "type" value = "pie" type = "checkbox" class = "checkbox" onChange = {filterTypeOptionChange}/><label>Pie</label><br></br>
          </div>

          <div class = "col-3"> 
            <h2>Filter By Seasonal Menu Items</h2>
            <input name = "seasonal-menu" value = "dairy-free" type = "checkbox" class = "checkbox" onChange = {filterSeasonalMenuChange}/><label>View seasonal menu items only</label>
          </div>

          <div class = "col-3">
            <button id = "resetButton" onClick = {resetAllFilters}>Reset All Filters</button>
          </div>
        </div>

        <div class = "row cart-contents">
          <h2>Cart</h2>
          {
          cart.map((item, index) => (
            <CartItem item = {item} updateFunction={removeFromCart}/>
          ))}

          {
            <div class = "CartItemPrice">
              <h3>Total: ${cart.map((item, index)=>(item.price))
                        .reduce((prevSum, currentPrice) => prevSum + currentPrice, 0)}</h3>
            </div>
          }
        </div>
          
        <div class = "row">
            {currentBakeryData.map((item, index) => ( 
              <BakeryItem item={item} updateFunction={addToCart}/>
            ))}
        </div>
            

        
      </div>

    )
}

export default App;
