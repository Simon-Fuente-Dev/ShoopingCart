import { useEffect, useId, useState } from 'react'
import { ClearCartIcon, RemoveFromCartIcon, CartIcon } from './Icons.jsx'
import './Cart.css'
import { useCart } from '../hooks/useCart.js';

function CartItem({ thumbnail, price, title, quantity, addToCart, reduceFromCart }) {
    return (
        <li>
            <img
                src={thumbnail}
                alt={title}
            />
            <div>
                <strong>{title}</strong> - ${price}
            </div>

            <footer>
                <small>
                    Qty: {quantity}
                </small>
                <button onClick={reduceFromCart}>-</button>
                <button onClick={addToCart}>+</button>
            </footer>
        </li>
    )
}

const Cart = () => {
    const cartCheckboxId = useId()
    const { cart, clearCart, addToCart, reduceFromCart } = useCart()
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Calcula la suma de los precios cada vez que cambia el carrito
        const newTotalPrice = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
        setTotalPrice(newTotalPrice);
    }, [cart]);

    return (
        <>
            <label className='cart-button' htmlFor={cartCheckboxId}>
                <CartIcon />
            </label>
            <input id={cartCheckboxId} type="checkbox" hidden />

            <aside className='cart'>
                <h2>Total del carro: ${totalPrice}</h2> {/* Muestra el total debajo del botón */}

                <button onClick={clearCart}>
                    <ClearCartIcon />
                </button>
                <ul>
                    {cart.map(product => (
                        <CartItem
                            key={product.id}
                            {...product}
                            addToCart={() => addToCart(product)}
                            reduceFromCart={() => reduceFromCart(product)}
                        />
                    ))}
                </ul>

            </aside>
        </>
    )
}

export default Cart
