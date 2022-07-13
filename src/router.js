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
            name: "about",
            component: () => import("./views/AboutView")
        },
        //  Family
        {
            path: '/family',
            name: "family",
            component: () => import("./views/family/FamilyView")
        },
        {
            path: '/addfamily',
            name: "addfamily",
            component: () => import("./views/family/addFamilyView")
        },
        {
            path: '/editfamily:id',
            //alias: "/editfamily",
            name: "editfamily",
            component: () => import("./views/family/editFamilyView")
        },
        // SubFamily
        {
            path: '/subfamily',
            name: "subfamily",
            component: () => import("./views/subfamily/SubFamilyView")
        },
        {
            path: '/addsubfamily',
            name: "addsubfamily",
            component: () => import("./views/subfamily/addSubFamilyView")
        },
        {
            path: '/editsubfamily:id',
            name: "editsubfamily",
            component: () => import("./views/subfamily/editSubFamilyView")
        },
        //  Article
        {
            path: '/article',
            name: "article",
            component: () => import("./views/article/ArticleView")
        },
        {
            path: '/addarticle',
            name:  "addarticle",
            component: () => import("./views/article/addArticleView")
        },
        {
            path: '/editarticle:id',
            name:  "editarticle",
            component: () => import("./views/article/editArticleView")
        },
        //  Presentation
        {
            path: '/presentation',
            name:  "presentation",
            component: () => import("./views/presentation/PresentationView")
        },
        {
            path: '/addpresentation',
            name:  "addpresentation",
            component: () => import("./views/presentation/addPresentationView")
        },
        {
            path: '/editpresentation:id',
            name:  "editpresentation",
            component: () => import("./views/presentation/editPresentationView")
        },
        /**
         * Taxe
         */
        {
            path: '/tax',
            name:  "tax",
            component: () => import("./views/taxe/TaxeView")
        },
        {
            path: '/addtax',
            name:  "addtax",
            component: () => import("./views/taxe/addTaxeView")
        },
        {
            path: '/editTax:id',
            name:  "editTax",
            component: () => import("./views/taxe/editTaxeView")
        },
    ]
});