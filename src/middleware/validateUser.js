function validateUser(req, res, next) {
    const { name, email, age } = req.body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
        return res.status(400).json({
            success: false,
            message: "Name must contain at least 2 characters."
        });
    }

    if (!email || typeof email !== "string") {
        return res.status(400).json({
            success: false,
            message: "Email is required."
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email."
        });
    }

    if (age !== undefined && (!Number.isInteger(age) || age < 1 || age > 120)) {
        return res.status(400).json({
            success: false,
            message: "Age must be between 1 and 120."
        });
    }

    next();
}

module.exports = validateUser;
