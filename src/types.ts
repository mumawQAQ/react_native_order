import {Database} from './database.types';

export type Tables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> =
    Database['public']['Enums'][T];
export type InsertTables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Update'];

export type Product = Tables<'products'>;
export type Order = Tables<'orders'>
export type OrderItem = Tables<'order_items'>;
export type InsertOrder = InsertTables<'orders'>;
export type InsertOrderItem = InsertTables<'order_items'>;
export type UpdateOrder = UpdateTables<'orders'>;

export type PizzaSize = 'S' | 'M' | 'L' | 'XL';

export type CartItem = {
    id: string;
    product: Product;
    product_id: number;
    size: PizzaSize;
    quantity: number;
};

export const OrderStatusList: OrderStatus[] = [
    'New',
    'Cooking',
    'Delivering',
    'Delivered',
];

export type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered';

export type Profile = {
    id: string;
    group: string;
};
