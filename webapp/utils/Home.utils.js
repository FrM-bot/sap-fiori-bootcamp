const ModelNames = {
    LocalModel: "LocalDataModel",
    ProductCollection: "ProductCollection"
}

sap.ui.define([
    'com/bootcamp/sapui5/freestyle/services/Home.services',
    "sap/ui/model/json/JSONModel"
], function (HomeService, JSONModel) {
    "use strict"

    return {
        init: function (onNorthwindModel) {
            this._onNorthwindModel = onNorthwindModel
        },

        getDataProducts: async function(onFilters) {
            return HomeService.getProducts(this._onNorthwindModel, onFilters)
        },

        setInitModelLocalData: function (oComponent) {
            oComponent.setModel(new JSONModel({
                valueInput: '',
                categories: [],
                suppliers: []
            }), ModelNames.LocalModel)
        },

        setProductModel: async function(oController, oDatos) {
            let oListModel = oController.getOwnerComponent().getModel(ModelNames.ProductCollection)

            if (!oListModel) {
                const oModel  = new JSONModel([]);
                oModel.setSizeLimit(1000000);	
                oController.getOwnerComponent().setModel(oModel, ModelNames.ProductCollection);  
                oListModel = oController.getOwnerComponent().getModel(ModelNames.ProductCollection);
            }

            oListModel.setData(oDatos)
        },

        getModelNames: function () {
            return ModelNames
        }
    }
})