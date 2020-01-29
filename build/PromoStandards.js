"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require("axios");
const templates = __importStar(require("./templates"));
const Utils = __importStar(require("./Utils"));
var PromoStandards;
(function (PromoStandards) {
    /** Class representing a PromoStandards Client */
    class Client {
        /**
         * Create a new PromoStandards Client
         * @param {string} options.id - Username provided by the supplier
         * @param {string} options.password - Password provided by the supplier
         * @param {Array.<ServiceEndpointType>} options.endpoints - List of endpoint objects
         */
        constructor(options = {}) {
            this.format = "json";
            /** @todo Add TypeChecking for all methods. */
            this.productData = {
                getProduct: this.promoStandardsAPIRequest.bind(this, "ProductData.getProduct"),
                getProductSellable: this.promoStandardsAPIRequest.bind(this, "ProductData.getProductSellable"),
                getProductDateModified: this.promoStandardsAPIRequest.bind(this, "ProductData.getProductDateModified"),
                getProductCloseOut: this.promoStandardsAPIRequest.bind(this, "ProductData.getProductCloseOut")
            };
            this.mediaContent = {
                getMediaContent: this.promoStandardsAPIRequest.bind(this, "MediaContent.getMediaContent"),
                getMediaDateModified: this.promoStandardsAPIRequest.bind(this, "MediaContent.getMediaDateModified")
            };
            this.inventory = {
                getInventoryLevels: this.promoStandardsAPIRequest.bind(this, "Inventory.getInventoryLevels"),
                getFilterValues: this.promoStandardsAPIRequest.bind(this, "Inventory.getFilterValues")
            };
            this.orderStatus = {
                getOrderStatusDetails: this.promoStandardsAPIRequest.bind(this, "OrderStatus.getOrderStatusDetails"),
                getOrderStatusTypes: this.promoStandardsAPIRequest.bind(this, "OrderStatus.getOrderStatusTypes")
            };
            this.orderShipmentNotification = {
                getOrderShipmentNotification: this.promoStandardsAPIRequest.bind(this, "OrderShipmentNotification.getOrderShipmentNotification")
            };
            this.invoice = {
                getInvoices: this.promoStandardsAPIRequest.bind(this, "Invoice.getInvoices")
            };
            this.productPricingAndConfiguration = {
                getAvailableLocations: this.promoStandardsAPIRequest.bind(this, "ProductPricingAndConfiguration.getAvailableLocations"),
                getDecorationColors: this.promoStandardsAPIRequest.bind(this, "ProductPricingAndConfiguration.getDecorationColors"),
                getFobPoints: this.promoStandardsAPIRequest.bind(this, "ProductPricingAndConfiguration.getFobPoints"),
                getAvailableCharges: this.promoStandardsAPIRequest.bind(this, "ProductPricingAndConfiguration.getAvailableCharges"),
                getConfigurationAndPricing: this.promoStandardsAPIRequest.bind(this, "ProductPricingAndConfiguration.getConfigurationAndPricing")
            };
            this.id = options.id;
            this.password = options.password;
            this.endpoints = options.endpoints;
            this.format = options.format || this.format;
        }
        /**
         * Get the service endpoint, if present.
         * @param {ServiceName} serviceName Service Endpoint Name
         */
        getEndpoint(serviceName) {
            let endpoint;
            if (this.endpoints && this.endpoints.length > 0) {
                endpoint = this.endpoints.find(x => x.type === serviceName);
                if (endpoint)
                    return endpoint;
            }
            throw new ReferenceError(`'${serviceName}' endpoint is undefined`);
        }
        /**
         * Generic method to use for all PS methods
         * @param {string} serviceAndMethodName - Identifies the PromoStandards service type and method name
         * @param params - Arguments required for the given PromoStandards method
         * @todo validate arguments based on service/method
         * */
        promoStandardsAPIRequest(serviceAndMethodName, params) {
            return new Promise((resolve, reject) => {
                const [service, method] = serviceAndMethodName.split(".");
                const endpoint = this.getEndpoint(service);
                /** @todo fix type check*/
                const soapTemplateIndex = templates;
                const requestXML = soapTemplateIndex[method](Object.assign({
                    id: this.id,
                    password: this.password,
                    wsVersion: endpoint.version
                }, params));
                axios
                    .post(endpoint.url, requestXML, {
                    headers: {
                        "Content-Type": "text/xml",
                        "SOAPAction": method
                    }
                })
                    .then((result) => {
                    this.format === "json"
                        ? resolve(Utils.convertXMLtoJSON(result.data))
                        : resolve(result.data);
                })
                    .catch((error) => reject(error));
            });
        }
    }
    PromoStandards.Client = Client;
})(PromoStandards = exports.PromoStandards || (exports.PromoStandards = {}));
//# sourceMappingURL=PromoStandards.js.map