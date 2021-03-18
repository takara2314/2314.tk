package api

import (
	"fmt"
	"net/smtp"
	"os"
)

func mailSend(data ContactInfo, userAgent string, IP string, device string, browser string) {
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
		mailBody = fmt.Sprintf(
			"%s\r\n\r\nこれは返信を求めています。\r\nメールアドレス: %s\r\nIPアドレス: %s\r\nユーザーエージェント: %s\r\nデバイス: %s\r\nブラウザ: %s\r\n",
			data.Content,
			data.Email,
			IP,
			userAgent,
			device,
			browser,
		)
	} else {
		mailBody = fmt.Sprintf(
			"%s\r\n\r\nこれは返信不要です。\r\nIPアドレス: %s\r\nユーザーエージェント: %s\r\nデバイス: %s\r\nブラウザ: %s\r\n",
			data.Content,
			IP,
			userAgent,
			device,
			browser,
		)
	}

	// メールデータ
	var mailContents []byte = []byte(
		fmt.Sprintf("From: %s<%s>\r\nTo: %s<%s>\r\nSubject: %s\r\n\r\n%s\r\n",
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
