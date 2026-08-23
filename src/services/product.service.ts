import productsData from '@/data/products.json';
import { ProductDTO } from '@/dtos/product.dto';

export class ProductService {
  /**
   * Obtiene la lista completa de DTOs de productos.
   */
  static async getProducts(): Promise<ProductDTO[]> {
    // Simula pequeña latencia de red
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Si existe en localStorage se usa la copia modificada, si no el JSON por defecto
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem('app_products');
      if (local) {
        try {
          return JSON.parse(local);
        } catch {
          // fallback a json
        }
      }
    }

    return productsData as ProductDTO[];
  }
}
