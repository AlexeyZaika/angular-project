import { IProductCategory } from '@shared/interfaces/catalog/product-category.interface';
import { IProductSubcategory } from '@shared/interfaces/catalog/product-subcategory.interface';
import { IProductCompany } from '@shared/interfaces/catalog/product-company.interface';
import { IProductCountry } from '@shared/interfaces/catalog/product-country.interface';
import { IProductSize } from '@shared/interfaces/catalog/product-size.interface';
import { IProductMaterial } from '@shared/interfaces/catalog/product-material.interface';
import { IProductImage } from '@shared/interfaces/catalog/product-image.interface';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  category: IProductCategory;
  subcategory: IProductSubcategory;
  price: number,
  company: IProductCompany;
  country: IProductCountry;
  material: IProductMaterial[];
  size: IProductSize;
  images: IProductImage[];
}
