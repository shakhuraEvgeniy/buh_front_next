"use client"
import * as costsApi from "@/app/utils/api/categorys";
import { Category } from "@/app/lib/definitions";
import { useEffect, useState } from 'react';

export default function Costs() {
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [subCategorys, setSubCategorys] = useState<Category[]>([]);

  useEffect(() => { getCategiryCost() }, []);
  useEffect(() => {
    if (categorys.length > 0) {
      getSubCategorysCost(categorys[0].id);
    }
  }, [categorys]);

  const getCategiryCost = async () => {
    try {
      const cat = await costsApi.getCategorysCostApi();
      setCategorys(cat);
    } catch (e) {
      console.log(e);
    };
  }

  const getSubCategorysCost = async (id: number) => {
    try {
      const subCat = await costsApi.getSubCategorysCostApi(id);
      setSubCategorys(subCat);
    } catch (e) {
      console.log(e);
    };
  }

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      await getSubCategorysCost(Number(e.target.value));
    } catch (e) {
      console.log(e);
    };
  }


  return (
    <>
      <form>
        <label>
          Дата:
          <input type="data" name='createTime' placeholder="Дата" />
        </label>
        <label>
          Счет:
          <input type="text" name='accountId' placeholder="Наименование" />
        </label>
        <label>
          Сумма:
          <input type="text" name='sum' placeholder="Сумма" />
        </label>
        <label>
          Категория:
          <select name='categoryId' onChange={handleChange}>
            {categorys.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </label>
        <label>
          Подкатегория:
          <select name='subCategoryId'>
            {subCategorys.map((subCategory) => (
              <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
            ))}
          </select>
        </label>
        <label>
          Комментарий:
          <input type="text" name='comment' placeholder="Комментарий" />
        </label>

        <button>Добавить</button>
        <button>Отменить</button>
      </form>
    </>
  );
}
