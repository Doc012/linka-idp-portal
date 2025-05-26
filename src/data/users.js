/**
 * Mock user data for development and testing purposes
 * This simulates data that would normally come from an API
 */

export const users = [
  {
    userID: 6,
    name: "Admin",
    surname: "User",
    phoneNumber: "+1234567890",
    email: "admin@example.com",
    wardNumber: 1,
    password: "$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG", // This should never be exposed in a real app
    enabled: true,
    verificationToken: null,
    verificationTokenExpiry: null,
    picUrl: "https://example.com/admin.jpg",
    verificationAttempts: 0,
    roleType: {
      roleID: 1,
      roleType: "ADMIN",
      description: "Administrator role",
      createdAt: null,
      updatedAt: null
    },
    createdAt: null,
    updatedAt: null
  },
  {
    userID: 7,
    name: "Resident",
    surname: "User",
    phoneNumber: "+1987654321",
    email: "resident@example.com",
    wardNumber: 2,
    password: "$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG", // This should never be exposed in a real app
    enabled: true,
    verificationToken: null,
    verificationTokenExpiry: null,
    picUrl: "https://example.com/resident.jpg",
    verificationAttempts: 0,
    roleType: {
      roleID: 2,
      roleType: "RESIDENT",
      description: "Resident role",
      createdAt: null,
      updatedAt: null
    },
    createdAt: null,
    updatedAt: null
  }
];

/**
 * Get a user by role type
 * @param {string} roleType - The role type to filter by (e.g., "ADMIN", "RESIDENT")
 * @returns {object|null} The user object or null if not found
 */
export const getUserByRole = (roleType) => {
  return users.find(user => user.roleType.roleType === roleType) || null;
};

/**
 * Get a user by ID
 * @param {number} id - The user ID to find
 * @returns {object|null} The user object or null if not found
 */
export const getUserById = (id) => {
  return users.find(user => user.userID === id) || null;
};

/**
 * Get the admin user
 * @returns {object|null} The admin user object or null if not found
 */
export const getAdminUser = () => {
  return getUserByRole("ADMIN");
};

/**
 * Get the resident user
 * @returns {object|null} The resident user object or null if not found
 */
export const getResidentUser = () => {
  return getUserByRole("RESIDENT");
};

export default {
  users,
  getUserByRole,
  getUserById,
  getAdminUser,
  getResidentUser
};