package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/justincremer/go-orm/src/server"
)

const (
	port string = ":8000"
)

func main() {
	config := fiber.Config{}
	server := server.Create(port, config)

	if err := server.Listen(port); err != nil {
		log.Fatal(err)
	}
}
