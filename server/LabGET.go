package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// LabGET <- [GET] /lab
func LabGET(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}
