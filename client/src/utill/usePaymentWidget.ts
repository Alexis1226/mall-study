import { useQuery } from '@tanstack/react-query';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';

export const usePaymentWidget = (clientKey: string, customerKey: string) => {
  return useQuery({
    queryKey: ['payment-widget', clientKey, customerKey],
    queryFn: () => {
      // ------  결제위젯 초기화 ------
      // @docs https://docs.tosspayments.com/reference/widget-sdk#sdk-설치-및-초기화
      return loadPaymentWidget(clientKey, customerKey);
    },
  });
};
