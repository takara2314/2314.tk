package api

import (
	"io/ioutil"
	"strings"
)

var (
	memos map[string]string = make(map[string]string, 256)
)

func init() {
	var err error

	// メモ一覧を取得
	files, err := ioutil.ReadDir("./memos")
	if err != nil {
		panic(err)
	}

	// メモの内容を格納
	for _, file := range files {
		data, err := ioutil.ReadFile("./memos/" + file.Name())
		if err != nil {
			panic(err)
		}

		// 拡張子
		devidedByDot := strings.Split(file.Name(), ".")
		extention := "." + devidedByDot[len(devidedByDot)-1]

		// マップに格納
		memos[strings.TrimRight(file.Name(), extention)] = string(data)
	}
}
