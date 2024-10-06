export function userNameFormatter(text: string | undefined) {
  return text?.split(' ').map(item => item.charAt(0).toUpperCase() + item.slice(1).toLocaleLowerCase()).join(' ')
}