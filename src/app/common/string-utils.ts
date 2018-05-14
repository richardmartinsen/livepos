
// Utility methods for strings.
export class StringUtils {

  static isEmptyOrBlank(str: string): boolean {
    return (!str || /^\s*$/.test(str));
  }

  static removeWhitespace(str: string): string {
    if (!str) {
      return str;
    }
    return str.replace(/\s/g, '');
  }

}
