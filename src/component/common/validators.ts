export const validators = {
  phoneNumber: (value: string) => /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/.test(value),
  email: (value: string) =>
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      value
    ),
}
