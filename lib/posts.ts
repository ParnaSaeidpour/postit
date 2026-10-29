export const MAX_TITLE_LENGTH = 300

// Returns an error message, or null when the post text is valid
export const validateTitle = (title: unknown): string | null => {
  if (typeof title !== "string" || !title.trim()) return "Please do not leave this empty"
  if (title.length > MAX_TITLE_LENGTH) return "Please write a shorter post"
  return null
}

// Only these user fields are sent to the browser (no email addresses)
export const publicUserFields = { id: true, name: true, image: true } as const
