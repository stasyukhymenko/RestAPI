# Реалізація інформаційного та програмного забезпечення

В рамках проєкту розробляється:

## SQL-скрипт для створення та початкового наповнення бази даних

```sql
-- -----------------------------------------------------
-- Schema project_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `project_db`;
USE `project_db` ;

-- -----------------------------------------------------
-- Table `project_db`.`roles`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `project_db`.`roles` ;

CREATE TABLE IF NOT EXISTS `project_db`.`roles` (
   `Id` INT NOT NULL AUTO_INCREMENT,
   `Name` VARCHAR(30) NULL DEFAULT NULL,
    PRIMARY KEY (`Id`),
    UNIQUE INDEX `Id` (`Id` ASC) VISIBLE,
    UNIQUE INDEX `Name` (`Name` ASC) VISIBLE);

-- -----------------------------------------------------
-- Table `project_db`.`users`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `project_db`.`users` ;

CREATE TABLE IF NOT EXISTS `project_db`.`users` (
    `Id` INT NOT NULL AUTO_INCREMENT,
    `Login` VARCHAR(45) NOT NULL,
    `Picture` MEDIUMBLOB NOT NULL,
    `Password` BLOB NOT NULL,
    `Email` VARCHAR(50) NOT NULL,
    `Role` VARCHAR(30) NOT NULL,
    PRIMARY KEY (`Id`),
    UNIQUE INDEX `Id` (`Id` ASC) VISIBLE,
    UNIQUE INDEX `Login` (`Login` ASC) VISIBLE,
    UNIQUE INDEX `Email` (`Email` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `project_db`.`members`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `project_db`.`members` ;

CREATE TABLE IF NOT EXISTS `project_db`.`members` (
    `Id` INT NOT NULL AUTO_INCREMENT,
    `RoleId` INT NOT NULL,
    `UserId` INT NOT NULL,
    PRIMARY KEY (`Id`),
    UNIQUE INDEX `Id` (`Id` ASC) VISIBLE,
    INDEX `roleFK_idx` (`RoleId` ASC) VISIBLE,
    INDEX `userFK_idx` (`UserId` ASC) VISIBLE,
    CONSTRAINT `roleFK`
    FOREIGN KEY (`RoleId`)
    REFERENCES `project_db`.`roles` (`Id`),
    CONSTRAINT `userFK`
    FOREIGN KEY (`UserId`)
    REFERENCES `project_db`.`users` (`Id`));

-- -----------------------------------------------------
-- Table `project_db`.`projects`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `project_db`.`projects` ;

CREATE TABLE IF NOT EXISTS `project_db`.`projects` (
    `Id` INT NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(50) NOT NULL,
    `Description` VARCHAR(100) NOT NULL,
    `Status` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`Id`),
    UNIQUE INDEX `Id` (`Id` ASC) VISIBLE);

-- -----------------------------------------------------
-- Table `project_db`.`payments`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `project_db`.`payments` ;

CREATE TABLE IF NOT EXISTS `project_db`.`payments` (
    `Id` INT NOT NULL AUTO_INCREMENT,
    `CardNumber` INT NOT NULL,
    `CardCVV` INT NOT NULL,
    `CardExpireDate` DATETIME NOT NULL,
    `Email` VARCHAR(50) NOT NULL,
    `ProjectId` INT NOT NULL,
    PRIMARY KEY (`Id`),
    UNIQUE INDEX `Id` (`Id` ASC) VISIBLE,
    INDEX `ProjectId` (`ProjectId` ASC) VISIBLE,
    CONSTRAINT `payments_ibfk_1`
    FOREIGN KEY (`ProjectId`)
    REFERENCES `project_db`.`projects` (`Id`));

-- -----------------------------------------------------
-- Table `project_db`.`permissions`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `project_db`.`permissions` ;

CREATE TABLE IF NOT EXISTS `project_db`.`permissions` (
    `Id` INT NOT NULL AUTO_INCREMENT,
    `Permission` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`Id`),
    UNIQUE INDEX `Id` (`Id` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `project_db`.`projects_members`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `project_db`.`projects_members` ;

CREATE TABLE IF NOT EXISTS `project_db`.`projects_members` (
    `MemberId` INT NOT NULL,
    `ProjectId` INT NOT NULL,
    INDEX `ProjectId` (`ProjectId` ASC) VISIBLE,
    INDEX `MemberId` (`MemberId` ASC) VISIBLE,
    CONSTRAINT `projects_members_ibfk_1`
    FOREIGN KEY (`ProjectId`)
    REFERENCES `project_db`.`projects` (`Id`),
    CONSTRAINT `projects_members_ibfk_2`
    FOREIGN KEY (`MemberId`)
    REFERENCES `project_db`.`members` (`Id`));

-- -----------------------------------------------------
-- Table `project_db`.`reviews`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `project_db`.`reviews` ;

CREATE TABLE IF NOT EXISTS `project_db`.`reviews` (
    `Id` INT NOT NULL AUTO_INCREMENT,
    `Text` VARCHAR(100) NOT NULL,
    `Rate` INT NOT NULL,
    `ProjectId` INT NOT NULL,
    PRIMARY KEY (`Id`),
    UNIQUE INDEX `Id` (`Id` ASC) VISIBLE,
    INDEX `ProjectId` (`ProjectId` ASC) VISIBLE,
    CONSTRAINT `reviews_ibfk_1`
    FOREIGN KEY (`ProjectId`)
    REFERENCES `project_db`.`projects` (`Id`));

-- -----------------------------------------------------
-- Table `project_db`.`role_grant`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `project_db`.`role_grant` ;

CREATE TABLE IF NOT EXISTS `project_db`.`role_grant` (
   `RoleId` INT NOT NULL,
   `PermissionId` INT NOT NULL,
    INDEX `RoleId` (`RoleId` ASC) VISIBLE,
    INDEX `PermissionId` (`PermissionId` ASC) VISIBLE,
    CONSTRAINT `role_grant_ibfk_1`
    FOREIGN KEY (`RoleId`)
    REFERENCES `project_db`.`roles` (`Id`),
    CONSTRAINT `role_grant_ibfk_2`
    FOREIGN KEY (`PermissionId`)
    REFERENCES `project_db`.`permissions` (`Id`));


-- -----------------------------------------------------
-- Table `project_db`.`tasks`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `project_db`.`tasks` ;

CREATE TABLE IF NOT EXISTS `project_db`.`tasks` (
    `Id` INT NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(50) NOT NULL,
    `Developer` VARCHAR(45) NOT NULL,
    `Status` VARCHAR(20) NOT NULL,
    `Deadline` DATETIME NOT NULL,
    `ProjectId` INT NOT NULL,
    PRIMARY KEY (`Id`),
    UNIQUE INDEX `Id` (`Id` ASC) VISIBLE,
    INDEX `ProjectId` (`ProjectId` ASC) VISIBLE,
    CONSTRAINT `tasks_ibfk_1`
    FOREIGN KEY (`ProjectId`)
    REFERENCES `project_db`.`projects` (`Id`));

-- Inserting data into the roles table
INSERT INTO `project_db`.`roles` (`Name`) VALUES
('Teamlead'),
('Developer'),
('Admin');

-- Inserting data into the users table
INSERT INTO `project_db`.`users` (`Login`, `Picture`, `Password`, `Email`, `Role`) VALUES
('admin_user', 'admin_picture_blob', 'admin_password_blob', 'admin@example.com', 'Teamlead'),
('dev_user1', 'dev_picture_blob1', 'dev_password_blob1', 'dev1@example.com', 'Developer'),
('dev_user2', 'dev_picture_blob2', 'dev_password_blob2', 'dev2@example.com', 'Developer'),
('manager_user', 'manager_picture_blob', 'manager_password_blob', 'manager@example.com', 'Admin');

-- Inserting data into the members table
INSERT INTO `project_db`.`members` (`RoleId`, `UserId`) VALUES
(1, 1),
(2, 2),
(2, 3),
(3, 4);

-- Inserting data into the projects table
INSERT INTO `project_db`.`projects` (`Name`, `Description`, `Status`) VALUES
('Project A', 'Description for Project A', 'Active'),
('Project B', 'Description for Project B', 'Inactive'),
('Project C', 'Description for Project C', 'Pending');

-- Inserting data into the permissions table
INSERT INTO `project_db`.`permissions` (`Permission`) VALUES
('Read'),
('Write'),
('Execute');

-- Inserting data into the role_grant table
INSERT INTO `project_db`.`role_grant` (`RoleId`, `PermissionId`) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 3),
(3, 2),
(3, 3);
-- Inserting data into the payments table
INSERT INTO `project_db`.`payments` (`Id`, `CardNumber`, `CardCVV`, `CardExpireDate`, `Email`, `ProjectId`) VALUES
(1, 123456, 123, '2023-12-31', 'payment1@example.com', 1),
(2, 987654, 456, '2023-11-30', 'payment2@example.com', 2),
(3, 111122, 789, '2023-10-31', 'payment3@example.com', 3);

-- Inserting data into the projects_members table
INSERT INTO `project_db`.`projects_members` (`MemberId`, `ProjectId`) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 3);

-- Inserting data into the reviews table
INSERT INTO `project_db`.`reviews` (`Text`, `Rate`, `ProjectId`) VALUES
('Good project!', 5, 1),
('Could be better', 3, 2),
('Excellent work', 5, 3);

-- Inserting data into the tasks table
INSERT INTO `project_db`.`tasks` (`Name`, `Developer`, `Status`, `Deadline`, `ProjectId`) VALUES
('Task 1', 'dev_user1', 'In Progress', '2023-11-15', 1),
('Task 2', 'dev_user2', 'To Do', '2023-12-01', 2),
('Task 3', 'dev_user1', 'Completed', '2023-10-31', 3);


```

## RESTfull сервіс для управління даними

### Вхідний файл програми

```js
const express = require('express');
const mysql = require('mysql2');
const connect = require("./connect");
const usersRouter = require("./routes/usersRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(usersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

### Файл для встановлення доступу до бази даних

```js
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
    connection.release();
});

module.exports = pool.promise();
```

### CRUD для користувачів

#### Маршрути

```js
const express = require('express');
const usersRouter = express.Router();
const controllers = require('../controllers/usersControllers');

usersRouter.post('/users', controllers.createUser);

usersRouter.get('/users', controllers.getAllUsers);

usersRouter.get('/users/:id', controllers.getUserById);

usersRouter.put('/users/:id', controllers.updateUser);

usersRouter.delete('/users/:id', controllers.deleteUser);

module.exports = usersRouter;
```

### Базовий клас з методами присутніми для управління даними всіх таблиць

```js
const pool = require('../connect');

class User {
    static async createUser({ Login, Picture, Password, Email, Role }) {
        const [result] = await pool.execute('INSERT INTO users (Login, Picture, Password, email, Role) VALUES (?, ?, ?, ?, ?)', [Login, Picture, Password, Email, Role]);
        return { id: result.insertId, Login, Picture, Email, Role };
    }

    static async getAll() {
        const [rows] = await pool.execute('SELECT * FROM users');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows;
    }

    static async updateById(id, { Login, Picture, Password, Email, Role }) {
        const [result] = await pool.execute('UPDATE users SET Login = ?, Picture = ?, Password = ?, Email = ?, Role = ? WHERE id = ?', [Login, Picture, Password, Email, Role, id]);
        return result.affectedRows > 0 ? { id, Login, Picture, Email, Role } : null;
    }

    static async deleteById(id) {
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            await connection.execute('DELETE FROM projects_members WHERE MemberId = ?', [id]);
            await connection.execute('DELETE FROM members WHERE UserId = ?', [id]);
            await connection.execute('DELETE FROM users WHERE id = ?', [id]);
            await connection.commit();

            return true;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
}

module.exports = {
    User,
};
```

#### Контроллер

```js
const { User } = require('../models/userModel');

const asyncWrapper = (callback) => {
    return async function (req, res) {
        const args = [];
        try {
            if (req.params.id) {
                args.push(req.params.id)
            }
            if (req.body) {
                args.push(req.body)
            }

            const result = await callback(...args);
            if (result === null || result.length === 0) {
                res.status(404).json({errorMessage: 'No such user'});
            } else {
                res.status(200).json({result});
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({errorMessage: 'Internal Server Error'});
        }
    };
};
const getAllUsers = asyncWrapper(User.getAll);
const getUserById = asyncWrapper(User.getById);
const createUser = asyncWrapper(User.createUser);
const updateUser = asyncWrapper(User.updateById);
const deleteUser = asyncWrapper(User.deleteById);

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
```