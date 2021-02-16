package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// ContactGET <- [GET] /contact
func ContactGET(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{
		"title":           "お問い合わせ",
		"type":            "website",
		"language":        "ja",
		"locale":          "ja_JP",
		"url":             "https://2314.tk/contact",
		"image":           "https://2314.tk/public/takaran.png",
		"twitterCard":     "summary",
		"twitterUsername": "takara2314",
		"description":     "お問い合わせは、Twitterもしくは、Discordまでお願いします。",
	})
}
