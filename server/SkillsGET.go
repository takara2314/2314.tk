package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// SkillsGET <- [GET] /skills
func SkillsGET(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{
		"title":           "できること",
		"type":            "website",
		"language":        "ja",
		"locale":          "ja_JP",
		"url":             "https://2314.tk/skills",
		"image":           "https://2314.tk/public/takaran.png",
		"twitterCard":     "summary",
		"twitterUsername": "takara2314",
		"description":     "プログラミング言語は、GoとPythonとTypeScriptができます。",
	})
}
