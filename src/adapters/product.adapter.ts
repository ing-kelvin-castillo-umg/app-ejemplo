import { ProductDTO } from '@/dtos/product.dto';
import { ProductModel } from '@/models/product.model';

export class ProductAdapter {
  static toModel(dto: ProductDTO): ProductModel {
    return {
      id: dto.prod_id,
      sku: dto.prod_code,
      name: dto.prod_name,
      category: dto.prod_category,
      sellingPrice: dto.prod_price_sell,
      costPrice: dto.prod_price_buy,
      stock: dto.prod_stock,
      minStock: dto.prod_min_stock,
      unit: dto.prod_unit,
      description: dto.prod_description,
      imageUrl: dto.prod_img,
      isLowStock: dto.prod_stock <= dto.prod_min_stock,
    };
  }

  static toModelList(dtos: ProductDTO[]): ProductModel[] {
    return dtos.map(this.toModel);
  }
}
