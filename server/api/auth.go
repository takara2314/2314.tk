package api

func auth(authHeader string, token string) bool {
	// 最初が Bearer でなければ
	if authHeader[:6] != "Bearer" {
		return false
	}

	// トークンが合っていなければ
	if authHeader[7:] != token {
		return false
	}

	return true
}
