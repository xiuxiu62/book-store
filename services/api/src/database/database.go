package database

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	Connection *gorm.DB
)

func Connect(dsn string) *gorm.DB {
	var err error
	config := postgres.Config{
		DSN:                  dsn,
		PreferSimpleProtocol: true,
	}

	if Connection, err = gorm.Open(postgres.New(config), &gorm.Config{}); err != nil {
		log.Fatal("Error connecting to database")
		return nil
	}

	fmt.Println("Connection successful")
	return Connection
}
