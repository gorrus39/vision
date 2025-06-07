const getLoginEmails = (amount: number) => {
  const emails = []
  for (let i = 1; i <= amount; i++) {
    emails.push(process.env[`LOGIN_EMAIL_${i}`])
  }
  return emails.filter(Boolean)
}

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    if (user.email && getLoginEmails(10).includes(user.email)) {
      await setUserSession(event, {
        user: {
          githubId: user.id,
          name: user.name,
          email: user.email,
        },
      })
      setCookie(event, "login-status", "authorization-success", {
        maxAge: 5,
      })
    } else {
      setCookie(event, "login-status", "authorization-error", {
        maxAge: 5,
      })
    }
    return sendRedirect(event, "/en/admin")
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    setCookie(event, "login-status", "authorization-error", {
      maxAge: 5,
    })

    console.error("GitHub OAuth error:", error)
    return sendRedirect(event, "/en/admin")
  },
})
