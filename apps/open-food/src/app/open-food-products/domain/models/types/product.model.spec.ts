import { code, url } from "@myorg/shared-util-functionnal";
import { Ingredient } from "./ingredient.model";

export interface Product {
  id: code; // Primary ID
  brand: string;
  imgUrl: url;
  ingredient:Ingredient;
}

export function theProduct(id: code, brand: string, imgUrl: url, ingredient:Ingredient): Product {
  return {
    id: id,
    brand: brand,
    imgUrl: imgUrl,
    ingredient: ingredient
  };
}

export function theId(product:Product):code{
return product.id;
}

export function theBrand (product:Product):string{
  return product.brand;
}

export function theImgUrl (product:Product):url{
  return product.imgUrl;
}

export function theIngredient(product:Product):Ingredient{
return product.ingredient
}