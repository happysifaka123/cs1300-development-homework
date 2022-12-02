import './CartItem.css';

export default function CartItem({item, updateFunction}){
    return(
        <div class = "CartItem"> 
            {item.name} ${item.price}
            <button onClick = {() => updateFunction(item)}>Remove</button>
        </div>)
}