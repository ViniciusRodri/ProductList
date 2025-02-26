// src/components/ProductForm.js
import React, { useState } from "react";

const ProductForm = ({ onSubmit, initialProduct = {}, onClose }) => {
  const [product, setProduct] = useState(initialProduct);
  const [errors, setErrors] = useState({}); // Estado para armazenar erros de validação

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validação específica para o campo de preço
    if (name === "price") {
      const priceValue = parseFloat(value);
      if (priceValue < 0) {
        setErrors({ ...errors, price: "O preço não pode ser negativo." });
        return; // Impede a atualização do estado se o valor for negativo
      } else {
        setErrors({ ...errors, price: null }); // Limpa o erro se o valor for válido
      }
    }

    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação final antes de enviar o formulário
    if (product.price < 0) {
      setErrors({ ...errors, price: "O preço não pode ser negativo." });
      return;
    }

    onSubmit(product);
    onClose(); // Fecha o modal após o envio
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          value={product.name || ""}
          onChange={handleChange}
          placeholder="Nome do Produto"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="description"
          value={product.description || ""}
          onChange={handleChange}
          placeholder="Descrição"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <input
          type="number"
          name="price"
          value={product.price || ""}
          onChange={handleChange}
          placeholder="Preço"
          className="w-full p-2 border rounded"
          required
          min="0" // Define o valor mínimo como 0
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price}</p>
        )}
      </div>
      <div>
        <input
          type="text"
          name="category"
          value={product.category || ""}
          onChange={handleChange}
          placeholder="Categoria"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Salvar
      </button>
    </form>
  );
};

export default ProductForm;
