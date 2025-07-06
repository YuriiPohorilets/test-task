function getBrowserName() {
  const userAgent = navigator.userAgent;

  switch (true) {
    case /Edg/i.test(userAgent):
      return 'edge';
    case /OPR|Opera/i.test(userAgent):
      return 'opera';
    case /Firefox/i.test(userAgent):
      return 'firefox';
    case /Safari/i.test(userAgent) && !/Chrome|CriOS|Edg|OPR/i.test(userAgent):
      return 'safari';
    case /Chrome|CriOS/i.test(userAgent):
      return 'chrome';
    default:
      return 'other';
  }
}

function normalizeString(string) {
  return string.trim().toLowerCase().replace(/\s+/g, ' ');
}

function download(content, fileName, contentType) {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  const fileURL = URL.createObjectURL(file);

  a.href = fileURL;
  a.download = fileName;
  a.click();

  URL.revokeObjectURL(fileURL);
}

function renderCurrentYear(containerRef) {
  if (!containerRef) return;

  const currentYear = new Date().getFullYear();
  containerRef.insertAdjacentHTML('beforeend', currentYear);
}

export { getBrowserName, download, renderCurrentYear, normalizeString };
