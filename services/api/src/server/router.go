package server

import (
	"github.com/gofiber/fiber/v2"
	"github.com/justincremer/go-orm/src/models/book"
	"github.com/justincremer/go-orm/src/models/user"
)

func welcome(c *fiber.Ctx) error {
	return c.SendString("Welcome from http://localhost:8000")
}

func bookRouter(app *fiber.App) {
	app.Get("/book", book.List)
	app.Get("/book/:id", book.Get)
	app.Post("/book", book.Create)
	app.Patch("/book/:id", book.Update)
	app.Delete("/book/:id", book.Delete)
}

func userRouter(app *fiber.App) {
	app.Get("/user", user.List)
	app.Get("/user/:id", user.Get)
	app.Post("/user", user.Create)
	app.Patch("/user/:id", user.Update)
	app.Delete("/user/:id", user.Delete)
}
