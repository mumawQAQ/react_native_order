import {supabase} from "@/src/lib/supabase";
import {Alert} from "react-native";
import {initPaymentSheet, presentPaymentSheet} from "@stripe/stripe-react-native";

const fetchPaymentSheetParams = async (amount: number) => {
    const {data, error} = await supabase.functions.invoke('payment-sheet', {body: {amount}})
    if (data) {
        return data
    }
    Alert.alert('Error', error.message)
    return {};
}
export const initializePaymentSheet = async (amount: number) => {
    const {paymentIntent, publishableKey, customer, ephemeralKey} = await fetchPaymentSheetParams(amount)
    if (!paymentIntent || !publishableKey) {
        return
    }
    await initPaymentSheet({
        merchantDisplayName: 'Guangrui Wa',
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        defaultBillingDetails: {
            name: 'Jane Doe',
        }
    })
}

export const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();
    if (error) {
        Alert.alert('Error', error.message)
        return false
    }
    return true
}
