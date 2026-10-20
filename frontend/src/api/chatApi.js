import axios from "axios";

// API base URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? "https://gpt-clone-final.onrender.com/api"
    : "http://localhost:3777/api");

// Remove trailing slashes and ensure /api appears only once
const normalizedBaseUrl = API_BASE_URL.replace(/\/+$/, "");

const FINAL_API_BASE_URL = normalizedBaseUrl.endsWith("/api")
  ? normalizedBaseUrl
  : `${normalizedBaseUrl}/api`;

// Create Axios instance
const API = axios.create({
  baseURL: FINAL_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all conversations
export const getConversations = async () => {
  const response = await API.get("/chat/conversations");
  return response.data;
};

// Create a conversation and send a question
export const sendMessage = async (question) => {
  const response = await API.post("/chat/conversations", {
    question,
  });

  return response.data;
};

// Convert Axios errors into user-friendly messages
export const getErrorMessage = (error) => {
  if (error?.response) {
    return (
      error.response.data?.message ||
      `Request failed with status ${error.response.status}.`
    );
  }

  if (error?.code === "ECONNABORTED") {
    return "The request timed out. Please try again.";
  }

  return `Cannot reach the server at ${FINAL_API_BASE_URL}. Check your backend connection.`;
};

export default API;





// import axios from "axios";

// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL ||
//   "http://localhost:3777/api";
//   // "https://gpt-clone-final.onrender.com/api";

// const API = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export const getConversations = async () => {
//   const response = await API.get("/chat/conversations");
//   return response.data;
// };

// export const sendMessage = async (question) => {
//   const response = await API.post("/chat/conversations", {
//     question,
//   });

//   return response.data;
// };

// // Convert an Axios failure into a clear, user-facing
// // message. Distinguishes:
// //   - HTTP errors (server responded with a status)
// //   - Timeouts
// //   - Network / CORS / connection-refused failures
// export const getErrorMessage = (error) => {
//   if (error?.response) {
//     return (
//       error.response.data?.message ||
//       `Request failed with status ${error.response.status}.`
//     );
//   }

//   if (error?.code === "ECONNABORTED") {
//     return "The request timed out. Please try again.";
//   }

//   return `Cannot reach the server at ${API_BASE_URL}. Make sure the backend is running.`;
// };

// export default API;
