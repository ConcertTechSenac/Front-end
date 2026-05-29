import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [itens, setItens] = useState([]);

  // Retorna { ok, erro } para o chamador poder exibir feedback
  const adicionarAoCarrinho = (produto, quantidade = 1) => {
    const estoqueDisponivel = produto.estoque ?? 0;

    if (estoqueDisponivel === 0) {
      return { ok: false, erro: 'Produto sem estoque.' };
    }

    let erro = null;
    setItens((prev) => {
      const existente = prev.find((i) => i.id === produto.id);
      const qtdAtual  = existente ? existente.quantidade : 0;
      const qtdNova   = qtdAtual + quantidade;

      if (qtdNova > estoqueDisponivel) {
        erro = `Estoque insuficiente. Máximo disponível: ${estoqueDisponivel} unidade${estoqueDisponivel !== 1 ? 's' : ''}.`;
        return prev; // não altera o carrinho
      }

      if (existente) {
        return prev.map((i) =>
          i.id === produto.id ? { ...i, quantidade: qtdNova } : i
        );
      }
      return [...prev, { ...produto, quantidade }];
    });

    // erro é preenchido de forma síncrona dentro do setItens acima
    // usamos uma variável local pois setItens é assíncrono mas o callback é síncrono
    return erro ? { ok: false, erro } : { ok: true };
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
      prev.map((i) => {
        if (i.id !== id) return i;
        const estoqueMax = i.estoque ?? Infinity;
        const qtdFinal   = Math.min(novaQuantidade, estoqueMax);
        return { ...i, quantidade: qtdFinal };
      })
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
