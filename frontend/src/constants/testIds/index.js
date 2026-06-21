export const HOME = {
  emergentLink: "home-emergent-link",
  bookCta: "hero-book-cta",
  servicesCta: "hero-services-cta",
  navBookCta: "nav-book-cta",
  navLogo: "nav-logo",
  navHome: "nav-link-home",
  navServices: "nav-link-services",
  navAbout: "nav-link-about",
  navResources: "nav-link-resources",
  navContact: "nav-link-contact",
};

export const BOOKING = {
  page: "booking-page",
  serviceSelect: "booking-service-select",
  serviceItem: (id) => `booking-service-${id}`,
  calendar: "booking-calendar",
  slot: (s) => `booking-slot-${s}`,
  nextBtn: "booking-next-btn",
  backBtn: "booking-back-btn",
  fullName: "booking-fullname",
  email: "booking-email",
  phone: "booking-phone",
  company: "booking-company",
  notes: "booking-notes",
  submit: "booking-submit",
  successCard: "booking-success",
};

export const CONTACT = {
  form: "contact-form",
  name: "contact-name",
  email: "contact-email",
  phone: "contact-phone",
  company: "contact-company",
  message: "contact-message",
  submit: "contact-submit",
};

export const ADMIN = {
  loginForm: "admin-login-form",
  tokenInput: "admin-token-input",
  loginBtn: "admin-login-btn",
  bookingsTab: "admin-tab-bookings",
  contactsTab: "admin-tab-contacts",
  logoutBtn: "admin-logout-btn",
};

export const RESOURCES = {
  card: (slug) => `resource-card-${slug}`,
};
