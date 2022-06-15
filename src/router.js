import Vue from "vue";
import Router from "vue-router";


Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: "/menuItem",
            name: "menuItem",
            component: () => import("./components/MenuItem")
        },
        {
            path: '/about',
            //alias: "/about",
            name: "about",
            component: () => import("./views/AboutView")
        },
        {
            path: '/family',
            //alias: "/family",
            name: "family",
            component: () => import("./views/family/FamilyView")
        },
        {
            path: '/addfamily',
            //alias: "/addfamily",
            name: "addfamily",
            component: () => import("./views/family/addFamilyView")
        },
        {
            path: '/editfamily/',
            alias: "/editfamily",
            name: "editfamily",
            component: () => import("./views/family/editFamilyView")
        }
    ]
});