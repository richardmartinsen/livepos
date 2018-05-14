import * as moment from 'moment';

// Utility methods for date.
export class DateUtils {

  public static dateFormatShort = 'YYYY-MM-DD';

  public static dateFormatLong = 'YYYY-MM-DD HH:mm';

  public static format(date: Date, format: string) {
    if (!date) {
      return moment().format(DateUtils.dateFormatLong);
    }
    return moment(date).format(format);
  }

  public static formatLong(date?: Date): string {
    return DateUtils.format(date, DateUtils.dateFormatLong);
  }

  public static formatShort(date?: Date): string {
    return DateUtils.format(date, DateUtils.dateFormatShort);
  }


}
