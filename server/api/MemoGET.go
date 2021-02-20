package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// MemoGET <- [GET] /api/memo/:name
func MemoGET(c *gin.Context) {
	var memoName = c.Param("name")

	// :name に何も指定されていないなら
	if memoName == "" {
		memoName = "intro"
	}

	// トークン: wktk!TKrN:2314
	// もしこのコード見ている人がいれば、試してみてね！
	if len(c.Request.Header["Authorization"]) == 0 {
		// 認証ヘッダーがなければ
		c.String(http.StatusUnauthorized, "401 Unauthorized")

	} else if auth(c.Request.Header["Authorization"][0], "wktk!TKrN:2314") {
		if _, exist := memos[memoName]; exist {
			// メモが存在しているなら
			c.String(http.StatusOK, memos[memoName])
		} else {
			// メモが存在していないなら
			c.String(http.StatusNotFound, "404 Not Found")
		}

	} else {
		// 認証失敗したなら
		c.String(http.StatusUnauthorized, "401 Unauthorized")
	}
}
