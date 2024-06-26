import { WORDIGO_JWT_TOKEN_COOKIE } from "~constants"
import { localStorage } from "~utils/storage"

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    openWelcomePage()

    chrome.runtime.setUninstallURL(process.env.PLASMO_PUBLIC_FEEDBACK_URL)

    return
  }
})

const openWelcomePage = () => {
  chrome.tabs.create({
    active: true,
    url: "tabs/welcome.html"
  })
}

chrome.cookies.onChanged.addListener((changeInfo) => {
  if (changeInfo.cookie.name === WORDIGO_JWT_TOKEN_COOKIE) {
    if (changeInfo.removed || changeInfo.cookie.value.trim() === "") {
      void localStorage.remove(WORDIGO_JWT_TOKEN_COOKIE)
    } else {
      void localStorage.set(WORDIGO_JWT_TOKEN_COOKIE, changeInfo.cookie.value)
    }
  }
})

const getCookie = async () => {
  const cookie = await chrome.cookies.get({ url: process.env.PLASMO_PUBLIC_SITE_URL, name: WORDIGO_JWT_TOKEN_COOKIE })

  if (cookie?.value.trim() === "") {
    void localStorage.remove(WORDIGO_JWT_TOKEN_COOKIE)
  } else {
    void localStorage.set(WORDIGO_JWT_TOKEN_COOKIE, cookie?.value)
  }
}

void getCookie()

export {}
