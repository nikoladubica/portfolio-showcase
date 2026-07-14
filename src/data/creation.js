// Creation of Adam — layered fresco assets (public/img/creation/)
//
// All four layers (background, god-cluster, adam, hands) are exported from the
// SAME full-fresco canvas, in place and at the same scale, so they stack with
// absolute inset-0 and converge to the original painting when transforms are zero.

// Canvas dimensions of every layer (px) — measured from the exported files
export const CANVAS = { width: 3524, height: 1599 };

// The point between the two almost-touching fingertips, in canvas px.
// Derived from the measured alpha bounding boxes: Adam's hand reaches to
// x≈1496, God's begins at x≈1337, the hands strip is centred on y≈731.
// Used as the zoom transform-origin and the glow position in the finale.
export const FINGER_GAP = { x: 1416, y: 731 };
