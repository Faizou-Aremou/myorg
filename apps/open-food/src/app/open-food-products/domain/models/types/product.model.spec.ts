import { Code, Url } from "@myorg/shared-util-functionnal";
import { Ingredient } from "./ingredient.model";

export interface Product {
  id: Code; // Primary ID
  brand: string;
  imgUrl: Url;
  ingredient:Ingredient;
}

export function theProduct(id: Code, brand: string, imgUrl: Url, ingredient:Ingredient): Product {
  return {
    id: id,
    brand: brand,
    imgUrl: imgUrl,
    ingredient: ingredient
  };
}

export function theId(product:Product):Code{
return product.id;
}

export function theBrand (product:Product):string{
  return product.brand;
}

export function theImgUrl (product:Product):Url{
  return product.imgUrl;
}

export function theIngredient(product:Product):Ingredient{
return product.ingredient
}