import {createContext, PropsWithChildren, useContext, useState} from "react";
import {CartItem, PizzaSize, Product} from "@/src/types";
import {randomUUID} from "expo-crypto"

type CartType = {
    items: CartItem[],
    addItem: (product: Product, size: PizzaSize) => void,
}

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {
    },
})

export const useCart = () => useContext(CartContext)

const CartProvider = ({children}: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([])

    const addItem = (product: Product, size: PizzaSize) => {
        const newCartItem: CartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: 1,
        }
        setItems([...items, newCartItem])
    }

    return (
        <CartContext.Provider value={{
            items, addItem
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;