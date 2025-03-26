sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/bootcamp/sapui5/freestyle/utils/Routes.utils"
], (Controller, RoutesUtils) => {
    "use strict";

    return Controller.extend("com.bootcamp.sapui5.freestyle.controller.Detail", {
        onInit() {
            const oRouteNames = RoutesUtils.getRouteNames()
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute(oRouteNames.details).attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            // Obtener el ProductID de la URL y enlazar el contexto
            const sProductID = oEvent.getParameter("arguments").ProductID;


            this.getView().bindElement({
                path: `/Products(${sProductID})`,
                parameters: {
                    expand: "Order_Details"
                }
            });
        },
    });
});