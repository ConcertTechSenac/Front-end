import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUTOS_INICIAIS } from '../data/produtos';
import {
  apiListarProdutos,
  apiCriarProduto,
  apiAtualizarProduto,
  apiToggleDestaque,
  apiDeletarProduto,
} from '../services/api';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [produtos, setProdutos] = useState(PRODUTOS_INICIAIS);
  const [carregando, setCarregando] = useState(true);

  // Carrega produtos da API ao iniciar
  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const data = await apiListarProdutos();
      if (data.success && Array.isArray(data.produtos)) {
        setProdutos(data.produtos);
      }
    } catch (err) {
      // Sem conexão: mantém os dados estáticos como fallback
      console.warn('Usando produtos locais (sem conexão com API):', err.message);
    } finally {
      setCarregando(false);
    }
  };

  const adicionarProduto = async (dados) => {
    try {
      const data = await apiCriarProduto(dados);
      if (data.success) {
        setProdutos((prev) => [...prev, data.produto]);
        return data.produto;
      }
    } catch (err) {
      console.error('Erro ao criar produto:', err.message);
      throw err;
    }
  };

  const editarProduto = async (id, dados) => {
    try {
      const data = await apiAtualizarProduto(id, dados);
      if (data.success) {
        setProdutos((prev) =>
          prev.map((p) => (p.id === id ? data.produto : p))
        );
      }
    } catch (err) {
      console.error('Erro ao editar produto:', err.message);
      throw err;
    }
  };

  const removerProduto = async (id) => {
    try {
      await apiDeletarProduto(id);
      setProdutos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Erro ao remover produto:', err.message);
      throw err;
    }
  };

  const toggleDestaque = async (id) => {
    try {
      const data = await apiToggleDestaque(id);
      if (data.success) {
        setProdutos((prev) =>
          prev.map((p) => (p.id === id ? data.produto : p))
        );
      }
    } catch (err) {
      // Fallback local se API falhar
      setProdutos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, destaque: !p.destaque } : p))
      );
    }
  };

  const getProdutoById = (id) => produtos.find((p) => p.id === Number(id));

  const getProdutosByCategoria = (categoria) =>
    produtos.filter((p) => p.categoria === categoria);

  const getProdutosDestaque = () => produtos.filter((p) => p.destaque);

  return (
    <ProductContext.Provider
      value={{
        produtos,
        carregando,
        adicionarProduto,
        editarProduto,
        removerProduto,
        toggleDestaque,
        getProdutoById,
        getProdutosByCategoria,
        getProdutosDestaque,
        recarregar: carregarProdutos,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
