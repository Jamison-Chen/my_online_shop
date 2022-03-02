import { createStore } from "vuex";
import { ProductInfo, CartItemInfo, UserInfo } from "@/myInterface";

export default createStore({
    state: {
        backendApiUrl:
            // "https://online-shop-prototype.herokuapp.com/api",
            "http://127.0.0.1:8000/api",
        isLoggedIn: false as boolean,
        loginStatus: "loggedout" as
            | "loggedout"
            | "passed"
            | "wrong password"
            | "user not found"
            | "email not verified",
        userInfo: {
            name: "",
            email: "",
            phone_number: "",
            gender: "",
            date_of_birth: "",
            account_type: "",
        } as UserInfo,
        favoriteList: [] as ProductInfo[],
        cartItemList: [] as CartItemInfo[],
        cartTotalCosts: NaN as number,
        freight: NaN as number,
        cartItemCount: NaN as number,
        addToCartStatus: "..." as string,
    },
    mutations: {
        checkLoginStatus(state, response): void {
            state.isLoggedIn = response["status"] === "passed" ? true : false;
            state.loginStatus = response["status"];
            state.userInfo = response["data"];
            for (let each in state.userInfo) {
                if ((state.userInfo as any)[each] === null) {
                    (state.userInfo as any)[each] = "";
                }
            }
        },
        login(state): void {
            state.isLoggedIn = true;
            state.loginStatus = "passed";
        },
        logout(state): void {
            state.isLoggedIn = false;
            state.loginStatus = "loggedout";
        },
        getFavoriteList(state, response): void {
            state.favoriteList = response["data"];
        },
        addToFavoriteList(state, productInfo: ProductInfo): void {
            state.favoriteList.push(productInfo);
        },
        deleteFromFavoriteList(state, productInfo: ProductInfo): void {
            state.favoriteList = state.favoriteList.filter((each) => {
                return (
                    each.id !== productInfo.id &&
                    each.id.toString() !== productInfo.id
                );
            });
        },
        getCartItemList(state, response): void {
            state.cartItemList = response["data"]["cart_items"];
            state.cartTotalCosts = response["data"]["total_costs"];
            state.freight = response["data"]["freight"];
            state.cartItemCount = response["data"]["count"];
        },
        addToCart(state, response): void {
            state.cartItemCount = response["data"]["count"];
            state.addToCartStatus = response["status"];
            setTimeout(() => (state.addToCartStatus = "..."), 2000);
        },
        deleteFromCart(
            state,
            payload: {
                cartItemInfo: CartItemInfo;
                response: any;
            }
        ): void {
            state.cartItemList = state.cartItemList.filter((each) => {
                return (
                    each.cart_item_id !== payload.cartItemInfo.cart_item_id &&
                    each.cart_item_id.toString() !==
                        payload.cartItemInfo.cart_item_id
                );
            });
            state.cartTotalCosts = payload.response["data"]["total_costs"];
            state.freight = payload.response["data"]["freight"];
            state.cartItemCount = payload.response["data"]["count"];
        },
    },
    actions: {
        async checkLoginStatus(
            { dispatch, commit, state },
            requestBody: URLSearchParams = new URLSearchParams()
        ): Promise<void> {
            // The axios approach
            // this.$http.defaults.withCredentials = true;
            // this.response = await this.$http
            //   .post(this.endPoint, requestBody)
            //   .then((resp) => resp);

            // The fetch approach
            let resp = await fetch(`${state.backendApiUrl}/login`, {
                method: "post",
                body: requestBody,
                credentials: "include",
                // "credentials" to send cookie in the request and
                // accept the "set-cookie" header of the response
            }).then((res) => res.json());
            commit("checkLoginStatus", resp);
        },
        async logout({ dispatch, commit, state }): Promise<void> {
            let resp = await fetch(`${state.backendApiUrl}/logout`, {
                method: "post",
                credentials: "include",
            }).then((res) => res.json());
            if (resp["status"] === "succeeded") commit("logout");
        },
        async getFavoriteList({ dispatch, commit, state }): Promise<void> {
            let requestBody = new URLSearchParams();
            requestBody.append("operation", "read");
            let resp = await fetch(`${state.backendApiUrl}/favorites`, {
                method: "post",
                body: requestBody,
                credentials: "include",
            }).then((res) => res.json());
            commit("getFavoriteList", resp);
        },
        async updateFavoriteList(
            { dispatch, commit, state },
            payload: {
                productInfo: ProductInfo;
                operation: "create" | "delete";
            }
        ): Promise<void> {
            commit(
                payload.operation === "create"
                    ? "addToFavoriteList"
                    : "deleteFromFavoriteList",
                payload.productInfo
            );
            let requestBody = new URLSearchParams();
            requestBody.append("operation", payload.operation);
            requestBody.append("product", payload.productInfo.id);
            let resp = (
                (await fetch(`${state.backendApiUrl}/favorites`, {
                    method: "post",
                    body: requestBody,
                    credentials: "include",
                }).then((res) => res.json())) as any
            )["status"];
            if (resp !== "succeeded") {
                // rollback
                commit(
                    payload.operation === "create"
                        ? "deleteFromFavoriteList"
                        : "addToFavoriteList",
                    payload.productInfo
                );
            }
        },
        async getCartItemList({ dispatch, commit, state }): Promise<void> {
            let requestBody = new URLSearchParams();
            requestBody.append("operation", "read");
            let resp = await fetch(`${state.backendApiUrl}/cart/`, {
                method: "post",
                body: requestBody,
                credentials: "include",
            }).then((res) => res.json());
            commit("getCartItemList", resp);
        },
        async addToCart(
            { dispatch, commit, state },
            payload: { selectedInventoryId: string; quantity: number }
        ): Promise<void> {
            let requestBody = new URLSearchParams();
            requestBody.append("operation", "create");
            requestBody.append("inventory_id", payload.selectedInventoryId);
            requestBody.append("quantity", payload.quantity.toString());
            let resp = await fetch(`${state.backendApiUrl}/cart/`, {
                method: "post",
                body: requestBody,
                credentials: "include",
            }).then((res) => res.json());
            commit("addToCart", resp);
        },
        async deleteFromCart(
            { dispatch, commit, state },
            cartItemInfo: CartItemInfo
        ): Promise<void> {
            let requestBody = new URLSearchParams();
            requestBody.append("operation", "delete");
            requestBody.append("cart_item_id", cartItemInfo.cart_item_id);
            let resp = await fetch(`${state.backendApiUrl}/cart/`, {
                method: "post",
                body: requestBody,
                credentials: "include",
            }).then((res) => res.json());
            commit("deleteFromCart", {
                cartItemInfo: cartItemInfo,
                response: resp,
            });
        },
    },
    modules: {},
});
