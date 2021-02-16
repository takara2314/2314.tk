package main

import (
	"os"

	"github.com/gin-gonic/gin"

	"takara2314/server"
	serverApi "takara2314/server/api"
)

func main() {
	router := gin.Default()
	router.LoadHTMLGlob("./dist/*.html")
	router.StaticFile("/bundle.js", "./dist/bundle.js")
	router.StaticFile("/styles.css", "./dist/styles.css")
	router.Static("/fonts", "./dist/fonts/")
	router.Static("/public", "./public/")

	router.GET("/", server.AboutGET)
	router.GET("/about", server.AboutGET)
	router.GET("/skills", server.SkillsGET)
	router.GET("/works", server.WorksGET)
	router.GET("/favorites", server.FavoritesGET)
	router.GET("/lab", server.LabGET)
	router.GET("/contact", server.ContactGET)

	api := router.Group("/api")
	api.GET("/memo/:name", serverApi.MemoGET)

	router.Run(":" + os.Getenv("PORT"))
}
