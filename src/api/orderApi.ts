import axiosInstance from './axiosInstance'

export type ApiResponse<T> = {
  success: boolean
  data: T
  message?: string
}

export type OrderItem = {
  orderId: number
  clothesId: number
  imageUrl: string
  name: string
  quantity: number
  price: number
  discount: number
  size: string
  orderStatus: string
  createdAt: string
}

export type AddressInfo = {
  addressId: number
  name: string
  recipient: string
  zipCode: string
  baseAddress: string
  detailAddress: string
}

export type PaymentInfo = {
  paymentId: number
  cardNumber: string
  cardProvider: string
}

export type OrderDetailItem = {
  orderId: number;
  clothesId: number;
  imageUrl: string;
  detailUrl: string;
  name: string;
  quantity: number;
  price: number;
  discount: number;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL';
  payment: PaymentInfo;
  address: AddressInfo;
  createAt: string;
}

export const getOrders = async(): Promise<ApiResponse<OrderItem[]>> => {
  const response: ApiResponse<OrderItem[]> = await axiosInstance.get('/api/v1/orders');
  return response;
}

export const createOrder = async (
  cartId: number,
  addressId: number,
  paymentId: number
): Promise<ApiResponse<{}>> => {
  const response: ApiResponse<{}> = await axiosInstance.post('/api/v1/orders', {
    cartId: cartId,
    AddressId: addressId,
    paymentId: paymentId,
  })
  return response
}

export const updateOrderAddress = async (
    orderId: 1,
    addressId: 1
)=> {
  const response = await axiosInstance.patch(`/api/v1/orders`, {
    orderId: orderId,
    addressId: addressId,
  })
  return response;
}

export const getDetailOrder = async (orderId: number): Promise<ApiResponse<OrderDetailItem>> => {
  const response: ApiResponse<OrderDetailItem> = await axiosInstance.get(`/api/v1/orders/${orderId}`)
  return response;
}

export const deleteOrder = async (orderId: number) => {
  const response = await axiosInstance.delete(`/api/v1/orders/${orderId}`)
  return response;
}


export const getAddress = async (): Promise<ApiResponse<AddressInfo[]>> => {
  const response: ApiResponse<AddressInfo[]> = await axiosInstance.get('/api/v1/customer/address')
  return response;
}

export const createAddress = async (name: string, recipient: string, zipCode: string, baseAddress: string, detailAddress: string): Promise<number> => {
  const requestBody = {
    name: name,
    recipient: recipient,
    zipCode: zipCode,
    baseAddress: baseAddress,
    detailAddress: detailAddress,
  }

  try {
    const response = await axiosInstance.post(
      '/api/v1/customer/address',
      requestBody
    )
    const { addressId } = response.data.address;
    return Number(addressId)
  } catch (error) {
    console.error('Error saving address:', error)
  }
}

export const updateAddress = async (address: AddressInfo): Promise<void> => {
    const requestBody = {
        addressId: address.addressId,
        name: address.name,
        recipient: address.recipient,
        zipCode: address.zipCode,
        baseAddress: address.baseAddress,
        detailAddress: address.detailAddress,
    }

    try {
        await axiosInstance.patch(`/api/v1/customer/address`, requestBody)
    } catch (error) {
        console.error('Error updating address:', error)
    }
}

export const deleteAddress = async (addressId: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/api/v1/customer/address/${addressId}`)
    } catch (error) {
        console.error('Error deleting address:', error)
    }
}

export const getPayment = async (): Promise<ApiResponse<PaymentInfo[]>> => {
    const response: ApiResponse<PaymentInfo[]> = await axiosInstance.get('/api/v1/customer/payment')
    return response;
}

export const createPayment = async (cardNumber: number, cardProvider: string) => {
    const requestBody = {
        cardNumber: cardNumber,
        cardProvider: cardProvider,
    }

    try {
        const response = await axiosInstance.post('/api/v1/customer/payment', requestBody)
        return response;
    } catch (error) {
        console.error('Error saving payment:', error)
    }
}

export const updatePayment = async (payment: PaymentInfo): Promise<void> => {
    const requestBody = {
        paymentId: payment.paymentId,
        cardNumber: payment.cardNumber,
        cardProvider: payment.cardProvider,
    }

    try {
        await axiosInstance.patch(`/api/v1/customer/payment`, requestBody)
    } catch (error) {
        console.error('Error updating payment:', error)
    }
}

export const deletePayment = async (paymentId: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/api/v1/customer/payment/${paymentId}`)
    } catch (error) {
        console.error('Error deleting payment:', error)
    }
}