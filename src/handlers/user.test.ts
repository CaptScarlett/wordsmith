import prisma from "../db";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./user";

jest.mock("../db", () => ({
  user: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("Users Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const mockUsers = [{ id: 1, name: "John Doe" }];
      (prisma.user.findMany as jest.Mock).mockResolvedValueOnce(mockUsers);

      const req = {};
      const res = {
        json: jest.fn(),
      };

      await getAllUsers(req, res);

      expect(res.json).toHaveBeenCalledWith({ data: mockUsers });
      expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe("getUserById", () => {
    it("should return a user by ID", async () => {
      const mockUser = { id: 1, name: "John Doe" };
      (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockUser);

      const req = { params: { id: 1 } };
      const res = {
        json: jest.fn(),
      };

      await getUserById(req, res);

      expect(res.json).toHaveBeenCalledWith({ data: mockUser });
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe("createUser", () => {
    it("should create a user", async () => {
      const mockUser = { id: 1, name: "John Doe" };
      (prisma.user.create as jest.Mock).mockResolvedValueOnce(mockUser);

      const req = {
        body: {
          name: "John Doe",
          email: "johndoe@example.com",
          phone: "1234567890",
          address: "123 Street",
        },
      };
      const res = {
        json: jest.fn(),
      };

      await createUser(req, res);

      expect(res.json).toHaveBeenCalledWith({ data: mockUser });
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          name: "John Doe",
          email: "johndoe@example.com",
          phone: "1234567890",
          address: "123 Street",
        },
      });
    });
  });

  describe("updateUser", () => {
    it("should update a user", async () => {
      const mockUpdatedUser = { id: 1, name: "John Doe" };
      (prisma.user.update as jest.Mock).mockResolvedValueOnce(mockUpdatedUser);

      const req = {
        params: { id: 1 },
        body: {
          name: "John Doe",
          phone: "1234567890",
          address: "123 Street",
        },
      };
      const res = {
        json: jest.fn(),
      };

      await updateUser(req, res);

      expect(res.json).toHaveBeenCalledWith({ data: mockUpdatedUser });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          name: "John Doe",
          phone: "1234567890",
          address: "123 Street",
        },
      });
    });
  });

  describe("deleteUser", () => {
    it("should delete a user", async () => {
      const mockDeletedUser = { id: 1, name: "John Doe" };
      (prisma.user.delete as jest.Mock).mockResolvedValueOnce(mockDeletedUser);

      const req = {
        params: { id: 1 },
      };
      const res = {
        json: jest.fn(),
      };

      await deleteUser(req, res);

      expect(res.json).toHaveBeenCalledWith({ data: mockDeletedUser });
      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
