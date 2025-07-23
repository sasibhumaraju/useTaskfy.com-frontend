// utils/LocalstorageUtil.jsx

// Set a value in localStorage
export const setLocalStorage = (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  } catch (err) {
    console.error("Error setting localStorage:", err);
  }
};

// Get a value from localStorage
export const getLocalStorage = (key) => {
  try {
    const jsonValue = localStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (err) {
    console.error("Error reading localStorage:", err);
    return null;
  }
};

// Remove a key from localStorage
export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error("Error removing localStorage item:", err);
  }
};

// Clear all localStorage
export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (err) {
    console.error("Error clearing localStorage:", err);
  }
};
