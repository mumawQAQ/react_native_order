import {useMutation} from "@tanstack/react-query";
import {InsertOrderItem} from "@/src/types";
import {supabase} from "@/src/lib/supabase";

export const useInsertOrderItems = () => {


    return useMutation({
        async mutationFn(items: InsertOrderItem[]) {
            const {error, data: newOrder} = await supabase.from('order_items')
                .insert(items).select();

            if (error) {
                throw new Error(error.message);
            }
            return newOrder;
        }
    },)
}
