package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// ContactGET <- [GET] /contact
func ContactGET(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}
