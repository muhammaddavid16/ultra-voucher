const { PrismaClient } = require("@prisma/client");
const express = require("express");

const router = express.Router();
const prisma = new PrismaClient();

router
  .route("/users")
  .get(async (req, res) => {
    try {
      const users = await prisma.user.findMany({ orderBy: { id: "desc" } });
      res.json({ message: "Users retrieved successfully", users });
    } catch (error) {
      console.error("Error fetching users: ", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  })
  .post(async (req, res) => {
    const { name, email } = req.body;

    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
        },
      });
      res
        .status(201)
        .json({ message: "User added successfully", user: newUser });
    } catch (error) {
      console.log("Error adding user: ", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  });

router
  .route("/users/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.findFirst({
        where: { id },
      });
      res.json({ message: "User retrieved successfully", user });
    } catch (error) {
      console.error("Error fetching user: ", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
      await prisma.user.update({ where: { id }, data: { name, email } });
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.log("Error updating user: ", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;

    try {
      await prisma.user.delete({ where: { id } });
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.log("Error deleting user: ", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  });

module.exports = router;
