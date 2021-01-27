package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// AboutGET <- [GET] /about
func AboutGET(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}
