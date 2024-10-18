import sequelize from "../config/database";
import User from "../models/User";
import Job from "../models/Job";
import Application from "../models/Application";
import Chat from "../models/Chat";
import { faker } from "@faker-js/faker";

const seedDatabase = async () => {
  // Sync the database and drop existing tables
  await sequelize.sync({ force: true });

  // Create 10 users
  for (let i = 0; i < 10; i++) {
    await User.create({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: faker.helpers.arrayElement(["candidate", "recruiter"]),
    });
  }

  // Get recruiters to create jobs
  const users = await User.findAll({ where: { role: "recruiter" } });
  for (const user of users) {
    for (let j = 0; j < 5; j++) {
      await Job.create({
        title: faker.name.jobTitle(),
        description: faker.lorem.paragraph(),
        userId: user.id,
      });
    }
  }

  // Get candidates to apply for jobs
  const candidates = await User.findAll({ where: { role: "candidate" } });
  const jobs = await Job.findAll();
  for (const candidate of candidates) {
    for (const job of jobs) {
      await Application.create({
        userId: candidate.id,
        jobId: job.id,
        status: "applied",
      });
    }
  }

  // Create chat messages between candidates and recruiters
  for (let k = 0; k < 10; k++) {
    await Chat.create({
      senderId: faker.helpers.arrayElement(candidates).id,
      receiverId: faker.helpers.arrayElement(users).id,
      message: faker.lorem.sentence(),
    });
  }

  console.log("Database seeded successfully!");
};

// Execute the seeding function
seedDatabase()
  .catch((error) => console.error("Seeding error:", error))
  .finally(() => sequelize.close());
