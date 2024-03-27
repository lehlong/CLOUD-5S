type DebounceFunction<T extends (...args: any[]) => void> = (
    func: T,
    delay: number
  ) => T;
  
 export  const debounce: DebounceFunction<any> = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ) => {
    let timeoutId: any | null = null;
  
    return ((...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
        timeoutId = null;
      }, delay);
    }) as T;
  };

  export function formatNumber(number: number | string): string {
    const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedNumber;
  }
  