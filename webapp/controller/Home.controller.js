const FilterFields = {
    productName: 'ProductName',
    categoryId: 'CategoryID'
}

function remove(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        throw new Error('expected both arguments to be arrays');
    }
    
    let result = [];

    const { length } = arr1;
    for (let i = 0; i < length; i++) {
        const elem = arr1[i];
        if (arr2.indexOf(elem) == -1) {
            result.push(elem);
        }
    }
    return result;
}

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/bootcamp/sapui5/freestyle/utils/Home.utils",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "com/bootcamp/sapui5/freestyle/utils/Routes.utils",
    'sap/m/MessageToast'
], (Controller, HomeUtils, Filter, FilterOperator, RoutesUtils, MessageToast) => {
    "use strict";

    return Controller.extend("com.bootcamp.sapui5.freestyle.controller.Home", {
        async onInit() {
            this.oModelNames = HomeUtils.getModelNames()
            this.oRouteNames = RoutesUtils.getRouteNames()

            this.oRouter = this.getOwnerComponent().getRouter();

            try {
                const oDatos = await HomeUtils.getDataProducts([])

                const [{ results }] = oDatos

                await HomeUtils.setProductModel(this, results);
            } catch (error) {
                MessageToast.show("Error al obtener los datos", {
                    width: "auto"
                })
            }
        },

        onPress: async function () {
            const oFilter = []
            const { valueInput, categories, suppliers } = this.getOwnerComponent().getModel(this.oModelNames.LocalModel).getData()

            if (valueInput) {
                oFilter.push(new Filter("ProductName", FilterOperator.Contains, valueInput))
            }

            if (categories.length > 0) {
                categories.forEach(CategoryID => {
                    oFilter.push(new Filter("CategoryID", FilterOperator.EQ, CategoryID))
                });
            }

            if (suppliers.length > 0) {
                suppliers.forEach(SupplierID => {
                    oFilter.push(new Filter("SupplierID", FilterOperator.EQ, SupplierID))
                });
            }

            try {
                const oDatos = await HomeUtils.getDataProducts([oFilter])

                const [{ results }] = oDatos

                await HomeUtils.setProductModel(this, results);
            } catch (error) {
                // console.error("Error al obtener los datos:", error)
                MessageToast.show("Error al filtrar los datos", {
                    width: "auto"
                })
            }
        },

        onItemPress: function (oEvent) {
            let oSource = oEvent.getSource();

            let oDatos = oSource.getBindingContext(this.oModelNames.ProductCollection).getObject();

            this.oRouter.navTo(this.oRouteNames.details, {
                ProductID: oDatos.ProductID
            });
        },

        onSelectSupplier: function (oControlEvent) {
            const oModel = this.getView().getModel(this.oModelNames.LocalModel)
            const { suppliers } = oModel.getData()

            const oAddedTokens = oControlEvent.getParameters().addedTokens
            const oRemovedTokens = oControlEvent.getParameters().removedTokens

            if (oAddedTokens.length > 0) {
                const oAddedSuppliers = oAddedTokens.map((token) => token.getKey());
                // Move this to utils
                oModel.setProperty('/suppliers', [...suppliers, ...oAddedSuppliers])
            }

            if (oRemovedTokens.length > 0) {
                const oRemovedSuppliers = oRemovedTokens.map((token) => token.getKey());
                // Move this to utils
                oModel.setProperty('/suppliers', remove(suppliers, oRemovedSuppliers))
            }
        }
    });
});

