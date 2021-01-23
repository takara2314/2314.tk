package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func rootGET(c *gin.Context) {
	c.String(http.StatusOK, "こんにちは、世界！")
}
