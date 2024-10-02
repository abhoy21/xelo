export const base64Encode = (data: string) => {
  return Buffer.from(data).toString("base64");
};

export const base64Decode = (data: string) => {
  return Buffer.from(data, "base64").toString("utf-8");
};
