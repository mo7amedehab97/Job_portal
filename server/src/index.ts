import app from "./app";
import sequelize from "./config/database";

const PORT = app.get("port");

// Function to start the server after database initialization
const startServer = async () => {
  try {
    // Initialize the database connection
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  }
};

startServer();
