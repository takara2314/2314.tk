package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// FavoritesGET <- [GET] /favorites
func FavoritesGET(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}
