import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'; 
const Home = () => {
    const itemName = "iphone";
    const itemPrice = "2000";
    const [quantity, setQuantity] = useState(1)
    const [finalAmount, setFinalAmount] = useState(itemPrice)

    const navigate = useNavigate()

    const decrement = () => {
        if (quantity <= 1) {
            setQuantity(1)
            setFinalAmount(itemPrice)
        } else {
            setQuantity(quantity - 1)
            setFinalAmount(finalAmount - itemPrice)
        }
    }

    const increment = () => {
        setQuantity(quantity + 1)
        setFinalAmount(finalAmount + itemPrice)
    }

    const checkout = async () => {
        try {
            const res = await fetch("http://localhost:5000/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                
                mode: "cors",
                body: JSON.stringify({
                    items: [
                        {
                            id: 1,
                            quantity: quantity,
                            price: itemPrice,
                            name: itemName
                        },
                    ]
                })
            })
            const data = await res.json()
            console.log(data);
            window.open(data.url, '_blank');

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="home-container">
            <div className='img-side'>
                <img src="assets/iphone.jpg" />
            </div>
            <div className='content-side'>
                <h2>Iphone 13</h2>
                <h4> Price: 2000</h4>
                <div>
                    <button onClick={decrement}>-</button>
                    <span>{quantity}</span>
                    <button onClick={increment}>+</button>
                </div>
                <p>amount to be paid : RS {itemPrice * quantity}</p>
                <button className="checkout" onClick={checkout}>Checkout</button>
            </div>
        </div>
    )
}

export default Home
