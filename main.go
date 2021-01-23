package main

import (
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/", rootGET)

	router.Run(":" + os.Getenv("PORT"))
}
