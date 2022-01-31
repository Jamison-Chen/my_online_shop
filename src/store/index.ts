import { createStore } from "vuex";

export default createStore({
    state: {
        isLoggedIn: false as boolean,
        loginStatus: "loggedout" as
            | "loggedout"
            | "passed"
            | "wrong password"
            | "user not found",
    },
    mutations: {
        checkLoginStatus(state, statusResponded): void {
            state.isLoggedIn = statusResponded === "passed" ? true : false;
            state.loginStatus = statusResponded;
        },
        login(state): void {
            state.isLoggedIn = true;
            state.loginStatus = "passed";
        },
        logout(state): void {
            state.isLoggedIn = false;
            state.loginStatus = "loggedout";
        },
    },
    actions: {
        async checkLoginStatus(
            { commit },
            requestBody: URLSearchParams = new URLSearchParams()
        ): Promise<void> {
            // The axios approach
            // this.$http.defaults.withCredentials = true;
            // this.response = await this.$http
            //   .post(this.endPoint, requestBody)
            //   .then((resp) => resp);

            // The fetch approach
            let st = await fetch("http://127.0.0.1:8000/api/login", {
                method: "post",
                body: requestBody,
                credentials: "include",
                // "credentials" to send cookie in the request and
                // accept the "set-cookie" header of the response
            }).then((res) => res.json());
            commit("checkLoginStatus", st["status"]);
        },
        async logout({ commit }): Promise<void> {
            let st = await fetch("http://127.0.0.1:8000/api/logout", {
                method: "post",
                credentials: "include",
            }).then((res) => res.json());
            if (st["status"] === "succeeded") commit("logout");
        },
    },
    modules: {},
});
