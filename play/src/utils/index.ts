export function extractDomainOrIP(str: string) {
    // 正则表达式：匹配域名或 IP 地址
    const pattern = /(?:https?:\/\/)?([^\/\?:]+|\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b)/;
    const match = str.match(pattern);

    if (match) {
        return match[1]; // 返回域名或 IP 地址
    }
    return null; // 如果没有匹配，返回 null
}
export function generateCustomRandomString(length = 10, chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_?") {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

//获取系统主题色
export function getSystemTheme(): "light" | "dark" {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
    } else {
        return "light";
    }
}
//获取系统类型
export function getOS(): string {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent;
}
export function isMac() {
    const userAgent = getOS();

    if (userAgent.includes("mac")) {
        return true;
    } else {
        return false;
    }
}
export function getFilenameFromUrl(url:any) {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    return pathname.split('/').pop();
  } catch (e) {
    // 如果URL不合法，回退到字符串方法
    return url.split('/').pop().split('#')[0].split('?')[0];
  }
}

export function downloadFile(url: string) {

    // 创建一个隐藏的<a>元素
    const a = document.createElement("a");
    a.href = url;
    a.download = getFilenameFromUrl(url) || "download"; // 设置下载的文件名

    // 触发点击事件
    document.body.appendChild(a);
    a.click();

    // 清理
    document.body.removeChild(a);
}
