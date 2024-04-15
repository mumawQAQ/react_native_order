import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {supabase} from "@/src/lib/supabase";
import {useAuth} from "@/src/providers/AuthProvider";
import {InsertOrder, UpdateOrder} from "@/src/types";

export const useAdminOrdersList = ({archived = false}) => {
    const status = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering'];

    return useQuery({
        queryKey: ['orders', {archived}],
        queryFn: async () => {
            const {
                data,
                error
            } = await supabase.from('orders').select('*')
                .in('status', status).order('created_at', {ascending: false});
            if (error) {
                throw new Error(error.message);
            }
            return data;
        }
    })
}

export const useMyOrdersList = () => {
    const {session} = useAuth();
    const id = session?.user.id;
    return useQuery({
        queryKey: ['orders', {userId: id}],
        queryFn: async () => {
            if (!id) return null;
            const {data, error} = await supabase.from('orders')
                .select('*').eq('user_id', id).order('created_at', {ascending: false})
            if (error) {
                throw new Error(error.message);
            }
            return data;
        }
    })
}

export const useOrderDetails = (id: number) => {
    return useQuery({
        queryKey: ['orders', id],
        queryFn: async () => {
            const {data, error} = await supabase.from('orders')
                .select('*, order_items(*, products(*))').eq('id', id).single();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        }
    })
}

export const useInsertOrder = () => {
    const queryClient = useQueryClient();
    const {session} = useAuth();
    const userId = session?.user.id;


    return useMutation({
        async mutationFn(data: InsertOrder) {
            const {error, data: newOrder} = await supabase.from('orders')
                .insert({...data, user_id: userId}).select().single();

            if (error) {
                throw new Error(error.message);
            }
            return newOrder;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({queryKey: ['orders', {userId}]});
            await queryClient.invalidateQueries({queryKey: ['orders', {archived: false}]});
        }
    },)
}


export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn({id, updatedField}: { id: number, updatedField: UpdateOrder }) {
            const {
                error,
                data: updatedProduct
            } = await supabase.from('orders').update(updatedField).eq('id', id).select().single();

            if (error) {
                throw new Error(error.message);
            }
            return updatedProduct;
        },
        async onSuccess(_, data) {
            await queryClient.invalidateQueries({queryKey: ['orders']});
        }
    },)
}
