import { Router } from "express";

const router = Router();

router.get("/app", (req, res) => {
  res.json({ message: "Welcome to the Recruitment API!" });
});

export default router;
