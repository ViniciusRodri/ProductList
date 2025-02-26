import { useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import api from "../services/api";

export const useProducts = () => {
  const { state, dispatch } = useProductContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get("/products");
      dispatch({ type: "SET_PRODUCTS", payload: response.data });
    };

    fetchProducts();
  }, [dispatch]);

  const addProduct = async (product) => {
    const response = await api.post("/products", product);
    dispatch({ type: "ADD_PRODUCT", payload: response.data });
  };

  const updateProduct = async (id, product) => {
    const response = await api.put(`/products/${id}`, product);
    dispatch({ type: "UPDATE_PRODUCT", payload: response.data });
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    dispatch({ type: "DELETE_PRODUCT", payload: id });
  };

  const setCategoryFilter = (category) => {
    dispatch({ type: "SET_CATEGORY_FILTER", payload: category });
  };

  return {
    products: state.products,
    categoryFilter: state.categoryFilter,
    addProduct,
    updateProduct,
    deleteProduct,
    setCategoryFilter,
  };
};
