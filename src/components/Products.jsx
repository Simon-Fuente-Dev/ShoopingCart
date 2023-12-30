import React from 'react'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons';
import './Products.css'
import { useCart } from '../hooks/useCart';

const Products = ({ products }) => {
    const { addToCart, removeFromCart, cart } = useCart()

    const checkProductInCart = product => {
        return cart.some(item => item.id === product.id)
    }

    return (
        <main className='products'>
            <ul>
                {
                    products.slice(0, 10).map(product => {
                        const isProductInCart = checkProductInCart(product)

                        return (
                            <li key={product.id}>
                                <img src={product.thumbnail} alt={product.title} />
                                <div className="">
                                    <strong>{product.title} - ${product.price}</strong>
                                </div>
                                <button
                                    style={{backgroundColor: isProductInCart ? 'red' : ''}} 
                                    onClick={() =>
                                    isProductInCart 
                                    ? removeFromCart(product) 
                                    : addToCart(product)}>
                                    {
                                        isProductInCart
                                            ? <RemoveFromCartIcon />
                                            : <AddToCartIcon />
                                    }
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </main>
    )
}

export default Products