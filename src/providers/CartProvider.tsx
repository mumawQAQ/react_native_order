import {createContext, PropsWithChildren, useContext, useState} from "react";
import {CartItem, Order, PizzaSize, Product} from "@/src/types";
import {randomUUID} from "expo-crypto"
import {useInsertOrder} from "@/src/api/orders";
import {useRouter} from "expo-router";
import {useInsertOrderItems} from "@/src/api/order-items";
import {initializePaymentSheet, openPaymentSheet} from "@/src/lib/stripe";


type CartType = {
    items: CartItem[],
    addItem: (product: Product, size: PizzaSize) => void,
    updateQuantity: (itemId: string, amount: -1 | 1) => void,
    total: number,
    checkout: () => void
}

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {
    },
    updateQuantity: () => {
    },
    total: 0,
    checkout: () => {
    }
})

export const useCart = () => useContext(CartContext)

const CartProvider = ({children}: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([])
    const {mutate: insertOrder} = useInsertOrder()
    const {mutate: insertOrderItem} = useInsertOrderItems()
    const router = useRouter()

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

    const total = items.reduce((sum, item) => {
        return sum + item.product.price * item.quantity
    }, 0)

    const clearCart = () => {
        setItems([])
    }
    const checkout = async () => {
        await initializePaymentSheet(Math.floor(total * 100))
        const payed = await openPaymentSheet()
        if (!payed) {
            return
        }
        insertOrder({total}, {
            onSuccess: saveOrderItems
        })
    }

    const saveOrderItems = (data: Order) => {
        const orderItems = items.map((item) => {
            return {
                order_id: data.id,
                product_id: item.product_id,
                quantity: item.quantity,
                size: item.size,
            }
        })
        console.log(orderItems)
        insertOrderItem(orderItems, {
            onSuccess: () => {
                clearCart()
                router.push(`/(user)/orders/${data.id}`)
            }
        })
    }

    return (
        <CartContext.Provider value={{
            items, addItem, updateQuantity, total, checkout
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
