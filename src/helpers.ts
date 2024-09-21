export async function sha512(str: string): Promise<string> {
  return await crypto.subtle
    .digest("SHA-512", new TextEncoder().encode(str))
    .then((buf) => {
      return Array.prototype.map
        .call(new Uint8Array(buf), (x) => ("00" + x.toString(16)).slice(-2))
        .join("");
    });
}
