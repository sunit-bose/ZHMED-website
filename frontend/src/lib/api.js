import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const ADMIN_TOKEN_KEY = "zh_admin_token";

export const api = axios.create({ baseURL: API });

api.interceptors.request.use((cfg) => {
  if (cfg.url && cfg.url.startsWith("/admin")) return cfg;
  return cfg;
});

export function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY) || "";
}

export function setAdminToken(token) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function adminHeaders() {
  return { headers: { "X-Admin-Token": getAdminToken() } };
}

export const BRAND = {
  name: "ZH Medsolutions",
  motto: "You care for your patients. We care for your revenue.",
  tagline: "End-to-end medical billing for US healthcare providers.",
  email: "info@zhmedsolutions.com",
  phone: "+1 (850) 776-3864",
  address: "Available by appointment",
  website: "www.zhmedsolutions.com",
  logo: "https://customer-assets.emergentagent.com/job_provider-billing-hub/artifacts/6f0rr4pd_IMG_2401.PNG",
};
