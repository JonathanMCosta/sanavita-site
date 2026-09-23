export function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export function qs<T extends Element>(
  selector: string,
  root: ParentNode = document
): T | null {
  return root.querySelector<T>(selector)
}

export function qsa<T extends Element>(
  selector: string,
  root: ParentNode = document
): T[] {
  return Array.from(root.querySelectorAll<T>(selector))
}

export function on<K extends keyof HTMLElementEventMap>(
  target: EventTarget | null,
  event: K,
  handler: (event: HTMLElementEventMap[K]) => void
) {
  if (!target) return
  target.addEventListener(event, handler as EventListener)
}
