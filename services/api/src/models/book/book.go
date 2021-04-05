package book

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/justincremer/go-orm/src/database"

	"gorm.io/gorm"
)

type Book struct {
	gorm.Model
	Title  string `json:"title"`
	Author string `json:"author"`
	Genre  string `json:"genre"`
}

func List(c *fiber.Ctx) error {
	db := database.Connection

	var books []Book
	db.Find(&books)

	return c.JSON(books)
}

func Get(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.Connection

	var book Book
	db.Find(&book, id)

	return c.JSON(book)
}

func Create(c *fiber.Ctx) error {
	db := database.Connection
	book := new(Book)

	if err := c.BodyParser(book); err != nil {
		log.Fatal(err)
		return c.Status(503).SendString("Error reading input")
	}

	db.Create(&book)

	return c.JSON(book)
}

func Update(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.Connection

	var book Book
	updateBook := new(Book)

	db.Find(&book, id)
	if book.Title == "" {
		return c.Status(400).SendString("Book not found")
	}

	if err := c.BodyParser(updateBook); err != nil {
		log.Fatal(err)
		return c.Status(503).SendString("Error reading input")
	}

	db.Model(&book).Updates(&updateBook)

	return c.JSON(book)
}

func Delete(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.Connection

	var book Book
	db.Find(&book, id)
	if book.Title == "" {
		return c.Status(400).SendString("Book not found")
	}
	db.Delete(&book)

	return c.Status(200).SendString("Successfuly deleted book")
}
