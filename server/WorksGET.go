package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// WorksGET <- [GET] /works
func WorksGET(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{
		"title":           "作ったもの",
		"type":            "website",
		"language":        "ja",
		"locale":          "ja_JP",
		"url":             "https://2314.tk/works",
		"image":           "https://2314.tk/public/takaran.png",
		"twitterCard":     "summary",
		"twitterUsername": "takara2314",
		"description":     "代表作として、Kadai Store APIを開発しました。",
	})
}
