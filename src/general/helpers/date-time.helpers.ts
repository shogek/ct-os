/** `(new Date(), "en-US") => "Sep"` */
export function getMonthShortName(date: Date, locale: string): string {
   return new Intl.DateTimeFormat(locale, { month: 'short' }).format(date)
}

/** `(2, "seconds") => 2000` */
export function getMillisecondsFrom(value: number, type: 'seconds' | 'minutes'): number {
   switch (type) {
      case 'seconds':
         return value * 1000
      case 'minutes':
         return value * 60 * 1000
   }
}
