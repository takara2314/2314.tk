package main

import (
	"net/http"

	"takara2314/shorturl"

	"github.com/gin-gonic/gin"
)

// [GET] /
func rootGET(c *gin.Context) {
	c.String(http.StatusOK, "こんにちは、世界！"+shorturl.Hey())
}
