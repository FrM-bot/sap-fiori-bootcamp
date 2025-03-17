const Endoints = {
    products:"/Products"
}

sap.ui.define([], function () {
    "use strict"

    return {
        getProducts: async function (onModel, onFilters) {
            const aPromiseRequest = [
                new Promise(function (resolve, reject) {
                    onModel.read(Endoints.products, {
                        filters: onFilters,
                        success: resolve,
                        error: reject
                    })
                }.bind(this))
            ]

            return Promise.all(aPromiseRequest)
        }
    }
})