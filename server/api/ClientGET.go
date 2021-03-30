package api

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// ユーザー情報
type userActivity struct {
	DateTime time.Time `json:"datetime"`
	IP       string    `json:"ip"`
	Device   string    `json:"device"`
	Browser  string    `json:"browser"`
}

// ClientGET <- [GET] /api/client
func ClientGET(c *gin.Context) {
	// width, _ := strconv.Atoi(c.Query("width"))
	// height, _ := strconv.Atoi(c.Query("height"))

	var touchable bool
	if c.Query("touchable") == "yes" {
		touchable = true
	} else {
		touchable = false
	}

	userInfo := userActivity{
		DateTime: timeDiffConv(time.Now()),
		IP:       c.ClientIP(),
		Device:   getDevice(c.Request.Header.Get("user-agent"), touchable),
		Browser:  getBrowser(c.Request.Header.Get("user-agent")),
	}

	c.JSON(http.StatusOK, userInfo)
}

// 時差変換をして返す関数
func timeDiffConv(tTime time.Time) (rTime time.Time) {
	// よりUTCらしくする
	rTime = tTime.UTC()

	// UTC → JST
	var jst *time.Location = time.FixedZone("Asia/Tokyo", 9*60*60)
	rTime = rTime.In(jst)

	return
}
