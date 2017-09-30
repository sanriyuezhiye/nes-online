package router

import (
	"strconv"

	"github.com/MeteorKL/koala"

	gomail "gopkg.in/gomail.v1"
)

var mailSetting map[string]string

// SendToMail http://blog.csdn.net/u012210379/article/details/44224497
func SendToMail(to, subject, body, mailtype string) error {
	if mailSetting == nil {
		mailSetting, _ = koala.ReadJSONFile("util_mail.json")
	}
	user := mailSetting["user"]
	password := mailSetting["password"]
	host := mailSetting["host"]
	port, err := strconv.Atoi(mailSetting["port"])
	if err != nil {
		println(err)
		port = 465
	}
	msg := gomail.NewMessage()
	msg.SetHeader("From", user)
	msg.SetHeader("To", to)
	msg.SetHeader("Subject", subject)
	msg.SetBody(mailtype, body)
	mailer := gomail.NewMailer(host, user, password, port)
	if err := mailer.Send(msg); err != nil {
		return err
	}
	return nil
}