export interface ProductInfo {
    id: string;
    name: string;
    unit_price: number;
    category: string;
    brand: string;
    description: string;
    inventory: any;
    inventory_id: any;
}

export interface CartItemInfo {
    cart_item_id: string;
    product_id: string;
    product_name: string;
    color: string;
    size: string;
    unit_price: number;
    quantity: number;
    subtotal_costs: number;
}

export interface CategoryInfo {
    id: string;
    name: string;
}

export interface PageInfo {
    name: string;
    path: string;
}

export interface CarouselContentInfo {
    image: any;
    href: string;
    title: string;
}

export interface UserInfoInputSetting {
    inputName: string;
    nameDisplayed: string;
    type: "text" | "email" | "password" | "date" | "tel";
    required: boolean;
    pattern: string;
    placeholder: string;
    shouldAlert: boolean;
    disabled: boolean;
}

export interface ReceiverInfo {
    name: string;
    phone_number: string;
}

export interface UserInfo {
    name: string;
    email: string;
    phone_number: string;
    gender: string;
    date_of_birth: string;
    account_type: string;
}

export interface OrderInfo {
    id: string;
    name_of_picker: string;
    phone_number_of_picker: string;
    payment_method: string;
    address: string;
    final_cost: number;
    ordered_date: string;
    paid_date: string | null;
    shipped_date: string;
    arrived_date: string;
    picked_up_date: string;
    items: OrderItemInfo[];
}

export interface OrderItemInfo {
    product_name: string;
    product_specification: string;
    quantity: number;
    subtotal_costs: number;
}
