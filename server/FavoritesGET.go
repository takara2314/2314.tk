package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// FavoritesGET <- [GET] /favorites
func FavoritesGET(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{
		"title":           "好きなもの",
		"type":            "website",
		"language":        "ja",
		"locale":          "ja_JP",
		"url":             "https://2314.tk/favorites",
		"image":           "https://2314.tk/public/takaran.png",
		"twitterCard":     "summary",
		"twitterUsername": "takara2314",
		"description":     "食べ物部門は、ハンバーガーと寿司と牛丼です。",
	})
}
