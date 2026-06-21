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
  motto: "You Care For Your Patients. We Care For You.",
  tagline: "End-to-end medical billing for US healthcare providers.",
  email: "contact@zhmedsolutions.org",
  phone: "+1 (555) 010-0420",
  address: "Wilmington, Delaware, USA",
  website: "www.zhmedsolutions.org",
  logo: "https://customer-assets.emergentagent.com/job_c6fbacb9-b85a-476e-bf06-aa39de7b3ade/artifacts/4y8p3x2d_Image.jpg",
};
