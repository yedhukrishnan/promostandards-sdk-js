export declare namespace PromoStandards {
    /** Base Attributes for a PromoStandards Client */
    interface PromoStandardsBaseAttributes {
        id?: string;
        password?: string;
        endpoints?: ServiceEndpointType[];
        format?: ResponseFormatType;
    }
    /** Type of service check */
    type ServiceType = "Inventory" | "Invoice" | "MediaContent" | "OrderShipmentNotification" | "OrderStatus" | "ProductData" | "ProductPricingAndConfiguration" | "PurchaseOrder";
    /** Service endpoint object signature check */
    type ServiceEndpointType = {
        type: ServiceType;
        version: string;
        url: string;
    };
    type ResponseFormatType = "xml" | "json";
    /** Class representing a PromoStandards Client */
    class Client {
        id?: string;
        password?: string;
        endpoints?: ServiceEndpointType[];
        format: ResponseFormatType;
        /**
         * Create a new PromoStandards Client
         * @param {string} options.id - Username provided by the supplier
         * @param {string} options.password - Password provided by the supplier
         * @param {Array.<ServiceEndpointType>} options.endpoints - List of endpoint objects
         */
        constructor(options?: PromoStandardsBaseAttributes);
        /**
         * Get the service endpoint, if present.
         * @param {ServiceName} serviceName Service Endpoint Name
         */
        getEndpoint(serviceName: ServiceType): ServiceEndpointType;
        /**
         * Generic method to use for all PS methods
         * @param {string} serviceAndMethodName - Identifies the PromoStandards service type and method name
         * @param params - Arguments required for the given PromoStandards method
         * @todo validate arguments based on service/method
         * */
        promoStandardsAPIRequest(serviceAndMethodName: string, params: any): Promise<any>;
        /** @todo Add TypeChecking for all methods. */
        readonly productData: {
            getProduct: (params: any) => Promise<any>;
            getProductSellable: (params: any) => Promise<any>;
            getProductDateModified: (params: any) => Promise<any>;
            getProductCloseOut: (params: any) => Promise<any>;
        };
        readonly mediaContent: {
            getMediaContent: (params: any) => Promise<any>;
            getMediaDateModified: (params: any) => Promise<any>;
        };
        readonly inventory: {
            getInventoryLevels: (params: any) => Promise<any>;
            getFilterValues: (params: any) => Promise<any>;
        };
        readonly orderStatus: {
            getOrderStatusDetails: (params: any) => Promise<any>;
            getOrderStatusTypes: (params: any) => Promise<any>;
        };
        readonly orderShipmentNotification: {
            getOrderShipmentNotification: (params: any) => Promise<any>;
        };
        readonly invoice: {
            getInvoices: (params: any) => Promise<any>;
        };
        readonly productPricingAndConfiguration: {
            getAvailableLocations: (params: any) => Promise<any>;
            getDecorationColors: (params: any) => Promise<any>;
            getFobPoints: (params: any) => Promise<any>;
            getAvailableCharges: (params: any) => Promise<any>;
            getConfigurationAndPricing: (params: any) => Promise<any>;
        };
    }
}
