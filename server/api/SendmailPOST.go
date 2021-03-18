package api

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

// お問い合わせ情報
type ContactInfo struct {
	Name          string `json:"name"`
	IsWantedReply bool   `json:"is_wanted_reply"`
	Email         string `json:"email"`
	Content       string `json:"content"`
}

// SendmailPOST <- [POST] /api/sendmail
func SendmailPOST(c *gin.Context) {
	if len(c.Request.Header["Authorization"]) == 0 {
		// 認証ヘッダーがなければ
		c.String(http.StatusUnauthorized, "401 Unauthorized")

	} else if auth(c.Request.Header["Authorization"][0], os.Getenv("SENDMAIL_TOKEN")) {
		// 正しく認証されたなら
		var json ContactInfo
		// 正しく規定のJSONに変換できなければ
		if err := c.ShouldBindJSON(&json); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		// メールを送信
		mailSend(
			json,
			c.ClientIP(),
			c.Request.Header.Get("user-agent"),
			getDevice(c.Request.Header.Get("user-agent")),
			getBrowser(c.Request.Header.Get("user-agent")),
		)

	} else {
		// 認証失敗したなら
		c.String(http.StatusUnauthorized, "401 Unauthorized")
	}
}
