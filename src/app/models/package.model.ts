export interface PackageModel {
    description: string,
    weight: number,
    priceToPay: number,
    supplier: string,
    courier: string,
    courierTracking: string,
    internalTracking: string,
    statusHistory: [
        {
            description: string,
            date: string
        }
    ]
}