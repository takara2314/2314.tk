package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// SkillsGET <- [GET] /skills
func SkillsGET(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}
