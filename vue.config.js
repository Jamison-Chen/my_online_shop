module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import "@/assets/styles/_variables.scss";
                `,
            },
        },
    },
    publicPath:
        process.env.NODE_ENV === "production" ? "/my_online_shop/" : "/",
};
