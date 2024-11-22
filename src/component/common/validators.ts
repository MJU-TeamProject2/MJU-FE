export const validators = {
  phoneNumber: (value: string) => /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/.test(value),
  email: (value: string) =>
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      value
    ),
}

export const validateEmail = (email: string): string | undefined => {
  return validators.email(email)
    ? undefined
    : '유효한 이메일 주소를 입력해주세요.'
}

export const validatePhoneNumber = (
  phoneNumber: string
): string | undefined => {
  return validators.phoneNumber(phoneNumber)
    ? undefined
    : '전화번호는 xxx-xxxx-xxxx 형식이어야 합니다.'
}

export const validateHeight = (height: number): string | undefined => {
  return height >= 100 && height <= 250
    ? undefined
    : '키는 100cm에서 250cm 사이여야 합니다.'
}

export const validateWeight = (weight: number): string | undefined => {
  return weight >= 30 && weight <= 200
    ? undefined
    : '몸무게는 30kg에서 200kg 사이여야 합니다.'
}
