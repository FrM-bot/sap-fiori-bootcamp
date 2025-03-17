sap.ui.define([
    'com/bootcamp/sapui5/freestyle/services/Home.services'
], function (HomeService) {
    "use strict"

    return {
        init: function (onNorthwindModel) {
            this._onNorthwindModel = onNorthwindModel
        },
        getDataProducts: async function(onFilters) {

            // console.log('Hola')
            return HomeService.getProducts(this._onNorthwindModel, onFilters)
        }
    }
})