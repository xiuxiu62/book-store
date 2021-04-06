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
	var dtos []BookDto
	go db.Find(&books)
	for i := range books {
		dtos[i] = books[i].toDto()
	}

	return c.JSON(dtos)
}

func Get(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.Connection

	var book Book
	go db.Find(&book, id)

	return c.JSON(book.toDto())
}

func Create(c *fiber.Ctx) error {
	db := database.Connection
	book := new(Book)

	if err := c.BodyParser(book); err != nil {
		log.Fatal(err)
		return c.Status(503).SendString("Error reading input")
	}

	go db.Create(&book)

	return c.JSON(book.toDto())
}

func Update(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.Connection

	var book Book
	updateBook := new(Book)

	go db.Find(&book, id)
	if book.Title == "" {
		return c.Status(400).SendString("Book not found")
	}

	if err := c.BodyParser(updateBook); err != nil {
		log.Fatal(err)
		return c.Status(503).SendString("Error reading input")
	}

	go db.Model(&book).Updates(&updateBook)

	return c.JSON(book.toDto())
}

func Delete(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.Connection

	var book Book
	go db.Find(&book, id)
	if book.Title == "" {
		return c.Status(400).SendString("Book not found")
	}
	go db.Delete(&book)

	return c.Status(200).SendString("Successfuly deleted book")
}
