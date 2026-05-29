// services/api.js
import AsyncStorage from "@react-native-async-storage/async-storage";

// ─── URL do servidor ──────────────────────────────────────────────────────────
// Troque pelo seu IP local (ipconfig no terminal Windows)
export const BASE_URL = "http://192.168.15.213:3000/api/auth";
export const PRODUTOS_URL = "http://192.168.15.213:3000/api/produtos";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getToken = async () => AsyncStorage.getItem("token");

const authHeaders = async () => {
  const token = await getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const publicHeaders = { "Content-Type": "application/json" };

const fetchComTimeout = (url, options, ms = 10000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { ...options, signal: controller.signal }).finally(() =>
    clearTimeout(timer),
  );
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) throw new Error(data.erro || "Erro desconhecido");
  return data;
};

// ─── Usuário ──────────────────────────────────────────────────────────────────

export const apiCadastrar = async (nome, email, senha, telefone) => {
  const response = await fetchComTimeout(`${BASE_URL}/signup`, {
    method: "POST",
    headers: publicHeaders,
    body: JSON.stringify({ nome, email, senha, telefone }),
  });
  return handleResponse(response);
};

export const apiLogin = async (email, senha) => {
  const response = await fetchComTimeout(`${BASE_URL}/login`, {
    method: "POST",
    headers: publicHeaders,
    body: JSON.stringify({ email, senha }),
  });
  const data = await handleResponse(response);
  if (data.token) {
    await AsyncStorage.setItem("token", data.token);
    await AsyncStorage.setItem("user", JSON.stringify(data.user));
  }
  return data;
};

export const apiVerificarCodigo = async (email, otp) => {
  const response = await fetchComTimeout(`${BASE_URL}/verificar-codigo`, {
    method: "POST",
    headers: publicHeaders,
    body: JSON.stringify({ email, otp }),
  });
  return handleResponse(response);
};

export const apiObterPerfil = async () => {
  const response = await fetchComTimeout(`${BASE_URL}/perfil`, {
    method: "GET",
    headers: await authHeaders(),
  });
  return handleResponse(response);
};

export const apiAtualizarPerfil = async (dados) => {
  const response = await fetchComTimeout(`${BASE_URL}/perfil`, {
    method: "PUT",
    headers: await authHeaders(),
    body: JSON.stringify(dados),
  });
  return handleResponse(response);
};

// ─── Admin ────────────────────────────────────────────────────────────────────

export const apiLoginAdmin = async (usuario, senha) => {
  const response = await fetchComTimeout(`${BASE_URL}/login-admin`, {
    method: "POST",
    headers: publicHeaders,
    body: JSON.stringify({ usuario, senha }),
  });
  return handleResponse(response);
};

export const apiListarUsuarios = async () => {
  const response = await fetchComTimeout(`${BASE_URL}/usuarios`, {
    method: "GET",
    headers: publicHeaders,
  });
  return handleResponse(response);
};

export const apiDeletarUsuario = async (id) => {
  const response = await fetchComTimeout(`${BASE_URL}/usuarios/${id}`, {
    method: "DELETE",
    headers: publicHeaders,
  });
  return handleResponse(response);
};

// ─── Sessão ───────────────────────────────────────────────────────────────────

export const apiLogout = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");
};

export const getUsuarioLocal = async () => {
  const raw = await AsyncStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
};

// ─── Produtos ─────────────────────────────────────────────────────────────────

export const apiListarProdutos = async () => {
  const response = await fetchComTimeout(PRODUTOS_URL, {
    method: "GET",
    headers: publicHeaders,
  });
  return handleResponse(response);
};

export const apiCriarProduto = async (dados) => {
  const response = await fetchComTimeout(PRODUTOS_URL, {
    method: "POST",
    headers: publicHeaders,
    body: JSON.stringify(dados),
  });
  return handleResponse(response);
};

export const apiAtualizarProduto = async (id, dados) => {
  const response = await fetchComTimeout(`${PRODUTOS_URL}/${id}`, {
    method: "PUT",
    headers: publicHeaders,
    body: JSON.stringify(dados),
  });
  return handleResponse(response);
};

export const apiToggleDestaque = async (id) => {
  const response = await fetchComTimeout(`${PRODUTOS_URL}/${id}/destaque`, {
    method: "PATCH",
    headers: publicHeaders,
  });
  return handleResponse(response);
};

export const apiAtualizarEstoque = async (id, delta) => {
  const response = await fetchComTimeout(`${PRODUTOS_URL}/${id}/estoque`, {
    method: "PATCH",
    headers: publicHeaders,
    body: JSON.stringify({ delta }),
  });
  return handleResponse(response);
};

export const apiDeletarProduto = async (id) => {
  const response = await fetchComTimeout(`${PRODUTOS_URL}/${id}`, {
    method: "DELETE",
    headers: publicHeaders,
  });
  return handleResponse(response);
};
