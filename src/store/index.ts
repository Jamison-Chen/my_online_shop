import { createStore } from "vuex";
import { ProductInfo, UserInfo } from "@/myInterface";

export default createStore({
    state: {
        isLoggedIn: false as boolean,
        loginStatus: "loggedout" as
            | "loggedout"
            | "passed"
            | "wrong password"
            | "user not found",
        userInfo: {} as UserInfo,
        favoriteList: [] as ProductInfo[],
    },
    mutations: {
        checkLoginStatus(state, response): void {
            state.isLoggedIn = response["status"] === "passed" ? true : false;
            state.loginStatus = response["status"];
            state.userInfo.name = response["data"]["name"];
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
            state.favoriteList = state.favoriteList.filter(
                (each) =>
                    each.id !== productInfo.id &&
                    each.id.toString() !== productInfo.id
            );
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
            let resp = await fetch("http://127.0.0.1:8000/api/login", {
                method: "post",
                body: requestBody,
                credentials: "include",
                // "credentials" to send cookie in the request and
                // accept the "set-cookie" header of the response
            }).then((res) => res.json());
            commit("checkLoginStatus", resp);

            // Get Favorite List
            if (state.isLoggedIn) dispatch("getFavoriteList");
        },
        async logout({ commit }): Promise<void> {
            let resp = await fetch("http://127.0.0.1:8000/api/logout", {
                method: "post",
                credentials: "include",
            }).then((res) => res.json());
            if (resp["status"] === "succeeded") commit("logout");
        },
        async getFavoriteList({ commit }): Promise<void> {
            let requestBody = new URLSearchParams();
            requestBody.append("operation", "read");
            let resp = await fetch("http://127.0.0.1:8000/api/favorites", {
                method: "post",
                body: requestBody,
                credentials: "include",
            }).then((res) => res.json());
            commit("getFavoriteList", resp);
        },
        async updateFavoriteList(
            { commit },
            payload: {
                productInfo: ProductInfo;
                operation: "create" | "delete";
            }
        ): Promise<void> {
            let requestBody = new URLSearchParams();
            requestBody.append("operation", payload.operation);
            requestBody.append("product", payload.productInfo.id);
            let resp = (
                (await fetch("http://127.0.0.1:8000/api/favorites", {
                    method: "post",
                    body: requestBody,
                    credentials: "include",
                }).then((res) => res.json())) as any
            )["status"];
            if (resp === "succeeded") {
                commit(
                    payload.operation === "create"
                        ? "addToFavoriteList"
                        : "deleteFromFavoriteList",
                    payload.productInfo
                );
            }
        },
    },
    modules: {},
});
