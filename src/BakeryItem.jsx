import './BakeryItem.css';

export default function BakeryItem({item, updateFunction}){
    return(
        <div class = "BakeryItem"> 
            <div class = "row">
                <h3>{item.name}</h3>
                <div class = "col-6 d-flex justify-content-end">
                    <img src = {item.image}/>
                </div>
                <div class = "col-6 justify-content-start">
                    <p>Type: {item.type}</p>
                    <p>Price: ${item.price}</p>
                    <p>Review: {item.review} stars</p>
                    <p>Seasonal menu item: {item.seasonal_menu.toString()}</p>
                    <button onClick = {() => updateFunction(item)}>Add to Cart</button>
                </div>
                
            </div>         
        </div>)
}
