package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// WorksGET <- [GET] /works
func WorksGET(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}
