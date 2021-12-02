import { TIMEOUT_SEC } from "./config.js";

export async function getJSON(url) {
  try {
    const res = await Promise.race([fetch(url), timeOut(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`Server not available: ${res.status}`);

    return data;
  } catch (err) {
    throw err; //I want the error in the controller, not here.
  }
}

function timeOut(seg) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request time finished!. Time out after ${seg} seconds`)
      );
    }, seg * 1000);
  });
}
