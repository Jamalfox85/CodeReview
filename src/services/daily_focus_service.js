export async function getDailyVideo(focus) {
  return "https://youtu.be/-mUTU9MDOC8?si=-Iw_Osx0eMnjBpXn";
}
export async function getDailyArticle(focus) {
  return "https://dly.to/zbgculjFm3h";
}

export function getDailyFocus(roadmapObj) {
  let focus = roadmapObj[0][0];
  return {
    videoLink: "https://youtu.be/-mUTU9MDOC8?si=-Iw_Osx0eMnjBpXn",
    articleLink: "https://dly.to/zbgculjFm3h",
    focus: focus,
  };
}
