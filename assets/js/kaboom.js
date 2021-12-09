// import kaboom lib
import kaboom from "https://unpkg.com/kaboom@next/dist/kaboom.mjs";

// initialize kaboom context
export const k = kaboom({
    width: 640,
    height: 480,
    background: [0, 51, 102]
});

export default k;