package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/takara2314/2314.tk/shorturl"
)

// [GET] /
func rootGET(c *gin.Context) {
	c.String(http.StatusOK, "こんにちは、世界！"+shorturl.Hey())
}
