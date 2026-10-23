// Project ids are short slugs chosen in the frontend (e.g. "eightmedical"); each project's
// picture lives in its own storage folder, projects/<id>/, holding only the newest image.
const PROJECT_ID_RE = /^[a-z0-9][a-z0-9-]{0,39}$/;

export const isValidProjectId = (id) => typeof id === "string" && PROJECT_ID_RE.test(id);
export const projectFolder = (id) => `projects/${id}`;
