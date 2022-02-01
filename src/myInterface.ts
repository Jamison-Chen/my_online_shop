export interface ProductInfo {
    id: string;
    name: string;
    unit_price: number;
    category: string;
    brand: string;
    description: string;
    inventory: number;
    quantity_sold: number;
    is_favorite: boolean;
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

export interface UserFormFieldInfo {
    fieldName:
        | "name"
        | "email"
        | "password"
        | "date_of_birth"
        | "phone_number"
        | "password-check";
    nameDisplayed:
        | "Name"
        | "Email"
        | "Password"
        | "Date of Birth"
        | "Phone #"
        | "Password Check";
    type: "text" | "email" | "password" | "date" | "tel";
    required: boolean;
    pattern: string;
    placeholder: string;
    shouldAlert: boolean;
}

export interface UserInfo {
    name: string;
}
