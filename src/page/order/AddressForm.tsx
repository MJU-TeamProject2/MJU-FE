// AddressForm.tsx
import React from 'react'
import { Address } from '@/api/orderApi'
import { AddressInputContainer } from '@/component/styles/user/cartStyles'

interface AddressFormProps {
  address: Address
  setAddress: React.Dispatch<React.SetStateAction<Address>>
}

const AddressForm: React.FC<AddressFormProps> = ({ address, setAddress }) => {
  return (
    <AddressInputContainer>
      <p style={{ fontWeight: 'bold' }}>배송지 입력</p>
      <input
        type="text"
        placeholder="받는 사람"
        value={address.recipient}
        onChange={(e) =>
          setAddress({ ...address, recipient: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="우편번호"
        value={address.zipCode}
        maxLength={5}
        onChange={(e) =>
          setAddress({
            ...address,
            addressId: Number(e.target.value),
            zipCode: e.target.value,
          })
        }
      />
      <input
        type="text"
        placeholder="기본 주소"
        value={address.baseAddress}
        onChange={(e) =>
          setAddress({ ...address, baseAddress: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="상세 주소"
        value={address.detailAddress}
        onChange={(e) =>
          setAddress({ ...address, detailAddress: e.target.value })
        }
      />
    </AddressInputContainer>
  )
}

export default AddressForm
