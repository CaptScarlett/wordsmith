import { Router } from "express";
import { body } from "express-validator";
import {
  createUser,
  deleteUser,
  getUserById,
  getAllUsers,
  updateUser,
} from "./handlers/user";
import { handleInputErrors } from "./middleware/validationError";

const router = Router();

/**
 * user
 */
router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);
router.patch(
  "/user/:id",
  body("name").isString(),
  body("email").not().exists(),
  body("phone").optional().isString(),
  body("address").optional().isString(),

  handleInputErrors,
  updateUser
);
router.post(
  "/user",
  body("name").isString(),
  body("email").optional().isEmail(),
  body("phone").optional().isString(),
  body("address").optional().isString(),
  handleInputErrors,
  createUser
);
router.delete("/user/:id", deleteUser);

export default router;
