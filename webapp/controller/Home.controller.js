sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/bootcamp/sapui5/freestyle/utils/Home.utils",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, HomeUtils, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("com.bootcamp.sapui5.freestyle.controller.Home", {
        async onInit() {
        },
        onPress: async function () {
            const productName = "Chai"
            const oFilter = new Filter("ProductName", FilterOperator.Contains, productName)
        
            try {
                const oDatos = await HomeUtils.getDataProducts([oFilter])
                console.log({ oDatos })
            } catch (error) {
                console.error("Error al obtener los datos:", error)
            }
        }
    });
});

