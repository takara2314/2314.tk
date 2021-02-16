package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// AboutGET <- [GET] /about
func AboutGET(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{
		"title":           "僕について",
		"type":            "website",
		"language":        "ja",
		"locale":          "ja_JP",
		"url":             "https://2314.tk/about",
		"image":           "https://2314.tk/public/takaran.png",
		"twitterCard":     "summary",
		"twitterUsername": "takara2314",
		"description":     "気まぐれで生きている高専2年生です！幼少期にPCに興味を持ち、情報系の学校に進学しました。",
	})
}
