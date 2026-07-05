// A link that may not have a destination yet. No `href` ⇒ the UI renders a
// muted "Soon" chip instead of an anchor — dead links are impossible.
export type SoonLink = { label: string; href?: string };
