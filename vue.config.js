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
    publicPath: process.env.BASE_URL,
};
