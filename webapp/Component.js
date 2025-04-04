sap.ui.define([
    "sap/ui/core/UIComponent",
    "com/bootcamp/sapui5/freestyle/model/models",
    "com/bootcamp/sapui5/freestyle/utils/Home.utils"
], (UIComponent, models, HomeUtils) => {
    "use strict";

    return UIComponent.extend("com.bootcamp.sapui5.freestyle.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();

            this.setInitModel()
        },

        setInitModel: function () {
            HomeUtils.init(this.getModel())
            HomeUtils.setInitModelLocalData(this)
        }
    });
});