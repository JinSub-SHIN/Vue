export default function ({ app, store }) {
	app.router.beforeEach((to, from, next) => {
        // console.log("**** router")
        store.commit("header/setHeaderTitle", to.name)
        next()
	})
}
