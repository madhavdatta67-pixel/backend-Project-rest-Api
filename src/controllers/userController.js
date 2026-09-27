const fs = require("fs");
const path = require("path");

const usersFile = path.join(__dirname, "../../data/users.json");

function readUsers() {
    return JSON.parse(fs.readFileSync(usersFile, "utf8"));
}

function writeUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

function getUsers(req, res) {
    const users = readUsers();
    res.status(200).json({ success: true, data: users });
}

function getUserById(req, res) {
    const users = readUsers();
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found."
        });
    }

    res.status(200).json({ success: true, data: user });
}

function createUser(req, res) {
    const users = readUsers();
    const { name, email, age } = req.body;
    const existingUser = users.find(
        user => user.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "Email already exists."
        });
    }

    const newUser = {
        id: users.length === 0 ? 1 : users[users.length - 1].id + 1,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        age: age || null
    };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({
        success: true,
        message: "User created successfully.",
        data: newUser
    });
}

module.exports = { getUsers, getUserById, createUser };
