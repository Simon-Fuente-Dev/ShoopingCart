

export const cartInitialState = JSON.parse(window.localStorage.getItem('cart'))

export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REDUCE_FROM_CART: 'REDUCE_FROM_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART'
}

export const updateLocalStorage = state => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}

export const cartReducer = (state, action) => {

    const { ADD_TO_CART, REDUCE_FROM_CART, REMOVE_FROM_CART, CLEAR_CART } = CART_ACTION_TYPES

    const { type: actiontype, payload: actionPayload } = action

    switch (actiontype) {
        case ADD_TO_CART:
            {
                const { id } = actionPayload
                const productInCartIndex = state.findIndex(item => item.id === id)

                //Producto esta en el carrito
                if (productInCartIndex >= 0) {
                    const newState = structuredClone(state)
                    newState[productInCartIndex].quantity += 1
                    updateLocalStorage(newState)
                    return newState
                }

                //Producto no esta en el carrito

                const newState = [
                    ...state,
                    {
                        ...actionPayload, //producto
                        quantity: 1,
                    }
                ]
                updateLocalStorage(newState)

                return newState
            }

        case REDUCE_FROM_CART:
            {
                const { id } = actionPayload
                const productInCartIndex = state.findIndex(item => item.id === id)

                if (productInCartIndex >= 0) {
                    const newState = structuredClone(state)
                    if (newState[productInCartIndex].quantity > 1) {
                        newState[productInCartIndex].quantity -= 1
                        updateLocalStorage(newState)
                        return newState
                    }
                }
            }

        case REMOVE_FROM_CART:
            {
                const { id } = actionPayload
                const newState = state.filter(item => item.id !== id)
                updateLocalStorage(newState)
                return newState
            }

        case CLEAR_CART:
            {
                const emptyCart = []
                updateLocalStorage(emptyCart)
                return emptyCart
            }

    }
    return state
}
