import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [itens, setItens] = useState([]);

  const adicionarAoCarrinho = (produto, quantidade = 1) => {
    setItens((prev) => {
      const existente = prev.find((i) => i.id === produto.id);
      if (existente) {
        return prev.map((i) =>
          i.id === produto.id ? { ...i, quantidade: i.quantidade + quantidade } : i
        );
      }
      return [...prev, { ...produto, quantidade }];
    });
  };

  const removerDoCarrinho = (id) => {
    setItens((prev) => prev.filter((i) => i.id !== id));
  };

  const alterarQuantidade = (id, novaQuantidade) => {
    if (novaQuantidade <= 0) {
      removerDoCarrinho(id);
      return;
    }
    setItens((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantidade: novaQuantidade } : i))
    );
  };

  const limparCarrinho = () => setItens([]);

  const total = itens.reduce((sum, i) => sum + i.preco * i.quantidade, 0);
  const totalItens = itens.reduce((sum, i) => sum + i.quantidade, 0);

  return (
    <CartContext.Provider
      value={{
        itens,
        adicionarAoCarrinho,
        removerDoCarrinho,
        alterarQuantidade,
        limparCarrinho,
        total,
        totalItens,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
