/**
 * encode pretty, normal unicode chars to uqly url-compatible chars
 * @param {String} str
 * @return {String}
 */
export const urlEncode = str => encodeURIComponent(str)
  .replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16)}`);

/**
 * decode string to pretty, normal, unicode chars
 * @param {String} str
 * @return {String}
 */
export const urlDecode = str => decodeURIComponent(str.replace(/\+/g, '%20'));
