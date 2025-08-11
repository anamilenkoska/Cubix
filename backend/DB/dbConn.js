// const mysql = require('mysql2')
// const express = require('express')
// const bcrypt = require('bcrypt')


// const conn = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: 'SISIII2025_89231022',
// })

// conn.connect((err) => {
//     if (err) {
//         console.log('Error:' + err)
//         return
//     }
//     console.log("Connection established")
// })

// let dataPool = {}
// dataPool.allCubes = () => {
//     return new Promise((resolve, reject) => {
//         conn.query('SELECT * FROM Cube', (err, res) => {
//             if (err) {
//                 return reject(err)
//             }
//             return resolve(res)
//         })
//     })
// }

// dataPool.addUser = (username, email, password, role) => {
//     return new Promise((resolve, reject) => {
//         bcrypt.hash(password, 10, (err, hashedPassword) => {
//             if (err) {
//                 return reject(err)
//             }
//             conn.query('INSERT INTO User (username,email,password,role) VALUES (?,?,?,?)', [username, email, hashedPassword, role], (err, res) => {
//                 if (err) { return reject(err) }
//                 return resolve(res)
//                 console.log("received:", username, email, hashedPassword, role)
//             })
//         })

//     })
// }

// dataPool.authUser = (username) => {
//     return new Promise((resolve, reject) => {
//         conn.query('SELECT * FROM User WHERE username=?', [username], (err, results) => {
//             if (err) { return reject(err) }
//             if (results.length === 0) { return resolve('No user found') }
//             return resolve(results[0])
//         })
//     })
// }

// dataPool.getScramble = (cubeType, difficulty) => {
//     return new Promise((resolve, reject) => {
//         conn.query('SELECT * FROM Scramble WHERE CubeType=? AND Difficulty_level=? ORDER BY RAND() LIMIT 1', [cubeType, difficulty], (err, res) => {
//             if (err) {
//                 return reject(err)
//             }
//             return resolve(res[0])
//         })
//     })
// }

// dataPool.addAttempt = (userId, scrambleId, solving_time, solving_date) => {
//     return new Promise((resolve, reject) => {
//         conn.query('INSERT INTO Attempt (UserId,ScrambleId,Solving_time,Solving_date) VALUES (?,?,?,?)', [userId, scrambleId, solving_time, solving_date], (err, res) => {
//             if (err) { return reject(err) }
//             return resolve(res)
//         })
//     })
// }

// dataPool.getAlgorithm = (cubeType) => {
//     return new Promise((resolve, reject) => {
//         conn.query('SELECT * FROM Algorithm WHERE CubeType=?', [cubeType], (err, res) => {
//             if (err) { return reject(err) }
//             return resolve(res)
//         })
//     })
// }

// dataPool.getStats = (userId) => {
//     return new Promise((resolve, reject) => {
//         conn.query('SELECT MIN(Solving_time) AS pb, MAX(Solving_time) AS worst, AVG(Solving_time) AS average FROM Attempt WHERE UserId=?', [userId], (err, res) => {
//             if (err) { return reject(err) }
//             return resolve(res[0])
//         })
//     })
// }

// dataPool.addReport = (userId, pb, average_time, supervisorId, attemptId) => {
//     return new Promise((resolve, reject) => {
//         conn.query('INSERT INTO Report (UserId,Best_time,Average_time,SupervisorId,AttemptId) VALUES (?,?,?,?,?)', [userId, pb, average_time, supervisorId, attemptId], (err, res) => {
//             if (err) { return reject(err) }
//             return resolve(res)
//         })
//     })
// }

// dataPool.getReport = (userId) => {
//     return new Promise((resolve, reject) => {
//         conn.query(`SELECT a.Solving_time, a.Solving_date,u.username,
//             s.Steps as scramble,s.CubeType as cubeType,s.Difficulty_level as difficulty 
//             FROM Attempt a 
//             JOIN User u ON a.UserId=u.UserId 
//             JOIN Scramble s ON a.ScrambleId=s.ScrambleId 
//             WHERE a.UserId=? ORDER BY a.Solving_date DESC LIMIT 1`, [userId], (err, res) => {
//             if (err) { return reject(err) }
//             return resolve(res[0] || null)
//         })
//     })
// }

// dataPool.viewProfile = (userId) => {
//     return new Promise((resolve, reject) => {
//         conn.query(`SELECT u.username,u.role,u.logindate,
//             COUNT (a.AttemptId) AS total_solves
//             FROM User u 
//             LEFT JOIN Attempt a ON u.UserId=a.UserId
//             WHERE u.UserId=?
//             GROUP BY u.UserId, u.username, u.role, u.logindate`, [userId], (err, res) => {
//             if (err) { return reject(err) }
//             return resolve(res[0])
//         })
//     })
// }

// dataPool.getSupervisor = () => {
//     return new Promise((resolve, reject) => {
//         conn.query('SELECT * FROM Supervisor', (err, res) => {
//             if (err) { return reject(err) }
//             if (res.length > 0) {
//                 return resolve(res[0].SupervisorId)
//             }
//             return reject(new Error('No supervisor found'))
//         })
//     })
// }

// module.exports = dataPool


// DB/dbConn.js
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'SISIII2025_89231022',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

let dataPool = {};

// Get all cubes
dataPool.allCubes = async () => {
    const [rows] = await pool.query('SELECT * FROM Cube');
    return rows;
};

// Add user with hashed password
dataPool.addUser = async (username, email, password, role) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
        'INSERT INTO User (username, email, password, role) VALUES (?, ?, ?, ?)',
        [username, email, hashedPassword, role]
    );
    return result;
};

// Authenticate user by username
dataPool.authUser = async (username) => {
    const [rows] = await pool.query(
        'SELECT * FROM User WHERE username = ?',
        [username]
    );
    return rows.length > 0 ? rows[0] : 'No user found';
};

// Get a random scramble
dataPool.getScramble = async (cubeType, difficulty) => {
    const [rows] = await pool.query(
        'SELECT * FROM Scramble WHERE CubeType = ? AND Difficulty_level = ? ORDER BY RAND() LIMIT 1',
        [cubeType, difficulty]
    );
    return rows[0];
};

// Add an attempt
dataPool.addAttempt = async (userId, scrambleId, solving_time, solving_date) => {
    const [result] = await pool.query(
        'INSERT INTO Attempt (UserId, ScrambleId, Solving_time, Solving_date) VALUES (?, ?, ?, ?)',
        [userId, scrambleId, solving_time, solving_date]
    );
    return result;
};

// Get algorithms by cube type
dataPool.getAlgorithm = async (cubeType) => {
    const [rows] = await pool.query(
        'SELECT * FROM Algorithm WHERE CubeType = ?',
        [cubeType]
    );
    return rows;
};

// Get solving statistics
dataPool.getStats = async (userId) => {
    const [rows] = await pool.query(
        'SELECT MIN(Solving_time) AS pb, MAX(Solving_time) AS worst, AVG(Solving_time) AS average FROM Attempt WHERE UserId = ?',
        [userId]
    );
    return rows[0];
};

// Add report
dataPool.addReport = async (userId, pb, average_time, supervisorId, attemptId) => {
    const [result] = await pool.query(
        'INSERT INTO Report (UserId, Best_time, Average_time, SupervisorId, AttemptId) VALUES (?, ?, ?, ?, ?)',
        [userId, pb, average_time, supervisorId, attemptId]
    );
    return result;
};

// Get latest report for user
dataPool.getReport = async (userId) => {
    const [rows] = await pool.query(
        `SELECT a.Solving_time, a.Solving_date, u.username,
                s.Steps AS scramble, s.CubeType AS cubeType, s.Difficulty_level AS difficulty
         FROM Attempt a
         JOIN User u ON a.UserId = u.UserId
         JOIN Scramble s ON a.ScrambleId = s.ScrambleId
         WHERE a.UserId = ?
         ORDER BY a.Solving_date DESC
         LIMIT 1`,
        [userId]
    );
    return rows[0] || null;
};

// View profile
dataPool.viewProfile = async (userId) => {
    const [rows] = await pool.query(
        `SELECT u.username, u.role, u.logindate,
                COUNT(a.AttemptId) AS total_solves
         FROM User u
         LEFT JOIN Attempt a ON u.UserId = a.UserId
         WHERE u.UserId = ?
         GROUP BY u.UserId, u.username, u.role, u.logindate`,
        [userId]
    );
    return rows[0];
};

// Get first supervisor ID
dataPool.getSupervisor = async () => {
    const [rows] = await pool.query('SELECT * FROM Supervisor');
    if (rows.length > 0) {
        return rows[0].SupervisorId;
    }
    throw new Error('No supervisor found');
};

module.exports = dataPool;
