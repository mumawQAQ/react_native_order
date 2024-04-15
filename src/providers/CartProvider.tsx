import {createContext, PropsWithChildren, useContext, useState} from "react";
import {CartItem, PizzaSize, Product} from "@/src/types";
import {randomUUID} from "expo-crypto"

type CartType = {
    items: CartItem[],
    addItem: (product: Product, size: PizzaSize) => void,
    updateQuantity: (itemId: string, amount: -1 | 1) => void,
}

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {
    },
    updateQuantity: () => {
    },
})

export const useCart = () => useContext(CartContext)

const CartProvider = ({children}: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([])

    const addItem = (product: Product, size: PizzaSize) => {

        const existingItem = items.find((item) => item.product_id === product.id && item.size === size)

        if (existingItem) {
            updateQuantity(existingItem.id, 1)
            return
        }

        const newCartItem: CartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: 1,
        }
        setItems([...items, newCartItem])
    }

    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        const updatedItems = items.map((item) => {
            if (item.id === itemId) {
                return {
                    ...item,
                    quantity: item.quantity + amount
                }
            }
            return item
        }).filter((item) => item.quantity > 0)
        setItems(updatedItems)
    }

    return (
        <CartContext.Provider value={{
            items, addItem, updateQuantity
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
