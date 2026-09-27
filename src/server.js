const express = require("express");

const userRoutes = require("./routes/userRoutes");


const app = express();


// Middleware
app.use(express.json());


// Home endpoint
app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Backend API is running."
    });

});


// Health endpoint
app.get("/api/health", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Server is healthy."
    });

});


// User API routes
app.use("/api/users", userRoutes);


// Handle unknown routes
app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Route not found."
    });

});


// Start server
const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});