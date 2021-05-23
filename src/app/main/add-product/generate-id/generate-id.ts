import { ProductServiceService } from '../../product-service/product-service.service';
import { ProductModel } from '../model/product-model';

export class GenerateId {
    private id: number;

    constructor(
        private productService: ProductServiceService
    ) {
        this.id = 0;
    }

    public getId(): number {
        return this.id;
    }

    public generateId(): void {
        if (this.productService.getProductInventory()) {
            const productData: ProductModel[] = this.productService.getProductInventory().getValue();
            const lastIndex: number = this.productService.getProductInventory().getValue().length - 1;
            this.id = productData[lastIndex].id + 1;
            return;
        }
        this.id = this.id + 1;
    }

}
