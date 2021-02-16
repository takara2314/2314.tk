package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// LabGET <- [GET] /lab
func LabGET(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{
		"title":           "ラボ",
		"type":            "website",
		"language":        "ja",
		"locale":          "ja_JP",
		"url":             "https://2314.tk/lab",
		"image":           "https://2314.tk/public/takaran.png",
		"twitterCard":     "summary",
		"twitterUsername": "takara2314",
		"description":     "Comming soon…",
	})
}
