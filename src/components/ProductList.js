// src/components/ProductList.js
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
        <tr>
          <th className="px-6 py-3">Nome</th>
          <th className="px-6 py-3">Descrição</th>
          <th className="px-6 py-3">Preço</th>
          <th className="px-6 py-3">Categoria</th>
          <th className="px-6 py-3">Ações</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr
            key={product.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {product.name}
            </th>
            <td className="px-6 py-4">
              {product.description}
            </td>
            <td className="px-6 py-4">R$ {product.price}</td>
            <td className="px-6 py-4">{product.category}</td>
            <td className="px-6 py-4">
              <button
                onClick={() => onEdit(product)}
                className="text-blue-500 hover:text-blue-700 mr-5">
                <FaEdit size={20} />
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="text-red-500 hover:text-red-700">
                <FaTrash size={20}/>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
