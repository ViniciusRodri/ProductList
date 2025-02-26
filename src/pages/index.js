import React, { useState } from "react";
import { ProductProvider } from "../context/ProductContext";
import { useProducts } from "../hooks/useProducts";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import Filter from "../components/Filter";
import Modal from "../components/Modal";
import { FaPlus } from "react-icons/fa";

const App = () => {
  const {
    products,
    categoryFilter,
    addProduct,
    updateProduct,
    deleteProduct,
    setCategoryFilter,
  } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const filteredProducts = categoryFilter
    ? products.filter((product) => product.category === categoryFilter)
    : products;

  const categories = [...new Set(products.map((product) => product.category))];

  const handleAddProduct = (product) => {
    if (product.id) {
      updateProduct(product.id, product);
    } else {
      addProduct(product);
    }
    setIsModalOpen(false);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id);
  };

  return (
    <div className="App p-8 bg-slate-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Produtos</h1>

      <div className="flex justify-between items-center mb-6">
        <Filter categories={categories} onFilter={setCategoryFilter} />
        <button
          onClick={() => {
            setCurrentProduct(null);
            setIsModalOpen(true);
          }}
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300  rounded-lg 
          p-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          <FaPlus  />
        </button>
      </div>

      <ProductList
        products={filteredProducts}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4 text-white">
          {currentProduct ? "Editar Produto" : "Adicionar Produto"}
        </h2>
        <ProductForm
          onSubmit={handleAddProduct}
          initialProduct={currentProduct || {}}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default () => (
  <ProductProvider>
    <App />
  </ProductProvider>
);
