export default function decode(token: string) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    if (window && window.atob) return JSON.parse(window.atob(base64))
    const atob = (str: string) => Buffer.from(str, 'base64').toString('binary')
    return JSON.parse(atob(base64))
  } catch (_err) {
    return { name: null, email: null }
  }
}
