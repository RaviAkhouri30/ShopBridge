export class ProductModel {

    public get id(): number {
        return this.id;
    }

    public set id(id: number) {
        this.id = id;
    }

    public get productName(): string {
        return this.productName;
    }

    public set productName(productName: string) {
        this.productName = productName;
    }

    public get price(): number {
        return this.price;
    }

    public set price(price: number) {
        this.price = Number(price);
    }

    public get description(): string {
        return this.description;
    }

    public set description(description: string) {
        this.description = description;
    }

}
