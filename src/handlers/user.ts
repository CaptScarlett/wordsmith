import prisma from "../db";

// Get all
export const getAllUsers = async (_req, res) => {
  try {
    const users = await prisma.user.findMany({});
    res.json({ data: users });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
};

// Get User by ID
export const getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: +req.params.id },
    });
    if (user) {
      res.json({ data: user });
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user." });
  }
};

// Create one
export const createUser = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
      },
    });
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user." });
  }
};

// Update one
export const updateUser = async (req, res) => {
  try {
    const updated = await prisma.user.update({
      where: {
        id: +req.params.id,
      },
      data: {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
      },
    });
    res.json({ data: updated });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user." });
  }
};

// Delete one
export const deleteUser = async (req, res) => {
  try {
    const deleted = await prisma.user.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.json({ data: deleted });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user." });
  }
};
