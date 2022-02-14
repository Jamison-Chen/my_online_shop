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
