package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// [GET] /root
func helloGET(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}
