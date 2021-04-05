package user

import (
	"log"

	"github.com/gofiber/fiber/v2"

	database "github.com/justincremer/go-orm/src/database"
	utils "github.com/justincremer/go-orm/src/utils"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
	Phone    string `json:"phone"`
}

func List(c *fiber.Ctx) error {
	db := database.Connection

	var users []User
	db.Find(&users)

	return c.JSON(users)
}

func Get(c *fiber.Ctx) error {
	db := database.Connection
	id := c.Params("id")

	var user User
	db.Find(&user, id)

	return c.JSON(user)
}

func Create(c *fiber.Ctx) error {
	db := database.Connection

	user := new(User)

	if err := c.BodyParser(&user); err != nil {
		log.Fatal(err)
		return c.Status(503).SendString("Error reading input")
	}

	passhash, err := utils.HashPassword(user.Password)

	if err != nil {
		log.Fatal(err)
	}

	user.Password = passhash
	db.Create(&user)

	return c.JSON(user)
}

func Update(c *fiber.Ctx) error {
	db := database.Connection
	id := c.Params("id")

	var user User
	updateUser := new(User)

	db.Find(&user, id)

	if user.Username == "" {
		return c.Status(400).SendString("User not found")
	}

	if err := c.BodyParser(updateUser); err != nil {
		log.Fatal(err)
		return c.Status(503).SendString("Error reading input")
	}

	db.Model(&user).Updates(&updateUser)

	return c.JSON(user)
}

func Delete(c *fiber.Ctx) error {
	db := database.Connection
	id := c.Params("id")

	var user User
	db.Find(&user, id)
	if user.Username == "" {
		return c.Status(400).SendString("User not found")
	}
	db.Delete(&user)

	return c.Status(200).SendString("Successfuly deleted user")
}

func Authenticate(c *fiber.Ctx) error {
	db := database.Connection
	id := c.Params("id")

	var user User
	db.Find(&user, id)
	if user.Username == "" {
		return c.Status(400).SendString("User not found")
	}
	db.Delete(&user)

	return c.Status(200).SendString("Successfuly deleted user")
}
