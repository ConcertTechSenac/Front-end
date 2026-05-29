import React, { createContext, useContext, useState } from 'react';
import { PRODUTOS_INICIAIS } from '../data/produtos';

const ProductContext = createContext();

let proximoId = Math.max(...PRODUTOS_INICIAIS.map((p) => p.id)) + 1;

export function ProductProvider({ children }) {
  const [produtos, setProdutos] = useState(PRODUTOS_INICIAIS);

  const adicionarProduto = (dados) => {
    const novoProduto = { ...dados, id: proximoId++ };
    setProdutos((prev) => [...prev, novoProduto]);
    return novoProduto;
  };

  const editarProduto = (id, dados) => {
    setProdutos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...dados } : p))
    );
  };

  const removerProduto = (id) => {
    setProdutos((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleDestaque = (id) => {
    setProdutos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, destaque: !p.destaque } : p))
    );
  };

  const getProdutoById = (id) => produtos.find((p) => p.id === id);

  const getProdutosByCategoria = (categoria) =>
    produtos.filter((p) => p.categoria === categoria);

  const getProdutosDestaque = () => produtos.filter((p) => p.destaque);

  return (
    <ProductContext.Provider
      value={{
        produtos,
        adicionarProduto,
        editarProduto,
        removerProduto,
        toggleDestaque,
        getProdutoById,
        getProdutosByCategoria,
        getProdutosDestaque,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
