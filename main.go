package main

import (
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Static("/", "./out/")

	router.Run(":" + os.Getenv("PORT"))
}
