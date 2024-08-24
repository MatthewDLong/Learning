const Pool = require("pg").Pool;
const { body, param, validationResult } = require("express-validator");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PSQL_PORT,
});

// Get users
const getUsers = (req, res) => {
  pool.query("SELECT * FROM users ORDER BY id ASC LIMIT 10", (err, results) => {
    if (err) {
      throw err;
    }

    res.status(200).json(results.rows);
  });
};

// Get user by id
const getUser = [
  param("id").isNumeric(),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = parseInt(req.params.id);

    pool.query("SELECT * FROM users WHERE id = $1", [id], (err, results) => {
      if (err) {
        throw err;
      }

      res.status(200).json(results.rows);
    });
  },
];

// Create user
const createUser = [
  body("name").isAlphanumeric().isLength({ max: 30 }),
  body("email").isEmail(),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body;

    pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2)",
      [name, email],
      (err, results) => {
        if (err) {
          throw err;
        }

        res.status(201).json({
          name,
          email,
        });
      }
    );
  },
];

// Update user
const updateUser = [
  body("name").isAlphanumeric().isLength({ max: 30 }),
  body("email").isEmail(),
  param("id").isNumeric(),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body;
    const id = parseInt(req.params.id);

    pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3",
      [name, email, id],
      (err, results) => {
        if (err) {
          throw err;
        }

        res.status(201).json({
          name,
          email,
        });
      }
    );
  },
];

// Delete user
const deleteUser = [
  param("id").isNumeric(),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = parseInt(req.params.id);

    pool.query("DELETE FROM users WHERE id = $1", [id], (err, results) => {
      if (err) {
        throw err;
      }

      res.status(200).json(results.rows);
    });
  },
];

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
