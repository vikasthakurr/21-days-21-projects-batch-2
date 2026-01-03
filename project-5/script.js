const rosterUrl = "https://jsonplaceholder.typicode.com/users?_limit=10";
// Fake API to fetch 10 random providers

const clockUrl = "https://worldtimeapi.org/api/timezone/Asia/Kolkata";
// Real time API to sync with internet clock (IST)

// all major access
const providerSelect = document.getElementById("providerSelect");
const dateInput = document.getElementById("dateInput");
const loadSlotsBtn = document.getElementById("loadSlotsBtn");
const refreshBtn = document.getElementById("refreshBtn");
const slotsGrid = document.getElementById("slotsGrid");
const slotsHeadline = document.getElementById("slotsHeadline");
const slotMeta = document.getElementById("slotMeta");
const bookingsList = document.getElementById("bookingsList");
const clearBookingsBtn = document.getElementById("clearBookingsBtn");
const statProviders = document.getElementById("statProviders");
const statBookings = document.getElementById("statBookings");
const statClock = document.getElementById("statClock");
const lastSync = document.getElementById("lastSync");

// Modal elements
const confirmModal = new bootstrap.Modal(
  document.getElementById("confirmModal")
);
const confirmTitle = document.getElementById("confirmTitle");
const confirmMeta = document.getElementById("confirmMeta");
const confirmBtn = document.getElementById("confirmBtn");
const notesInput = document.getElementById("notesInput");
