export function jsonValuesToString(jsonObj: Record<string, any>): string {
  const values = extractValues(jsonObj);
  const resultString = values.join(" ");
  return resultString;
}

function extractValues(obj: Record<string, any>): string[] {
  let values: string[] = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        values = values.concat(extractValues(obj[key]));
      } else {
        values.push(String(obj[key]));
      }
    }
  }
  return values;
}
