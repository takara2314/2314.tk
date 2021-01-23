package main

import (
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.LoadHTMLGlob("./dist/*.html")
	router.StaticFile("/bundle.js", "./dist/bundle.js")

	router.GET("/", rootGET)
	router.GET("/hello", helloGET)

	router.Run(":" + os.Getenv("PORT"))
}
