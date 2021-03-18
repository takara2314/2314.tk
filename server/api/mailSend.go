package api

import (
	"fmt"
	"net/smtp"
	"os"
)

func mailSend(data ContactInfo, IP string, userAgent string, device string, browser string) {
	// 認証情報
	var auth smtp.Auth = smtp.PlainAuth(
		"",
		os.Getenv("FROM_EMAIL"),
		os.Getenv("FROM_PASSWORD"),
		os.Getenv("FROM_SMTP"),
	)

	// メール本文
	var mailBody string
	if data.IsWantedReply {
		var mailBodyFormat string = ("" +
			"<html><body>" +
			"%s<br>" +
			"<br>" +
			"<span style=\"color: rgb(185, 28, 28); font-weight: bold\">これは返信を求めています。</span><br>" +
			"メールアドレス: <b>%s</b><br>" +
			"IPアドレス: <b>%s</b><br>" +
			"ユーザーエージェント: <b>%s</b><br>" +
			"デバイス: <b>%s</b><br>" +
			"ブラウザ: <b>%s</b><br>" +
			"</body></html>")

		mailBody = fmt.Sprintf(
			mailBodyFormat,
			data.Content,
			data.Email,
			IP,
			userAgent,
			device,
			browser,
		)
	} else {
		var mailBodyFormat string = ("" +
			"<html><body>" +
			"%s<br>" +
			"<br>" +
			"<span style=\"color: rgb(4, 120, 87); font-weight: bold\">これは返信不要です。</span><br>" +
			"IPアドレス: <b>%s</b><br>" +
			"ユーザーエージェント: <b>%s</b><br>" +
			"デバイス: <b>%s</b><br>" +
			"ブラウザ: <b>%s</b><br>" +
			"</body></html>")

		mailBody = fmt.Sprintf(
			mailBodyFormat,
			data.Content,
			IP,
			userAgent,
			device,
			browser,
		)
	}

	// メールデータ
	var mailContentsFormat string = ("" +
		"From: %s<%s>\r\n" +
		"To: %s<%s>\r\n" +
		"Subject: %s\r\n" +
		"Mime-Version: 1.0\r\n" +
		"Content-Type: text/html; charset=\"utf-8\"\r\n" +
		"Content-Transfer-Encoding: 7bit\r\n" +
		"\r\n" +
		"%s\r\n")

	var mailContents []byte = []byte(
		fmt.Sprintf(mailContentsFormat,
			"2314.tk Contact",
			os.Getenv("FROM_EMAIL"),
			"タカラーン",
			os.Getenv("TO_EMAIL"),
			data.Name+"さんからお問い合わせが届きました！",
			mailBody,
		),
	)

	// メールを送信
	if err := smtp.SendMail(
		os.Getenv("FROM_SMTP")+":"+os.Getenv("FROM_SMTP_PORT"),
		auth,
		os.Getenv("FROM_EMAIL"),
		[]string{os.Getenv("TO_EMAIL")},
		mailContents,
	); err != nil {
		panic(err)
	}
}
