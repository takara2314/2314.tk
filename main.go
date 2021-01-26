package main

import (
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.LoadHTMLGlob("./dist/*.html")
	router.StaticFile("/bundle.js", "./dist/bundle.js")
	router.StaticFile("/styles.css", "./dist/styles.css")

	router.GET("/", indexGET)
	router.GET("/hello", helloGET)

	router.Run(":" + os.Getenv("PORT"))
}
