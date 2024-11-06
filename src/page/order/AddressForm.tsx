import React from 'react'
import { AddressInfo } from '@/api/orderApi'
import { AddressInputContainer } from '@/component/styles/user/cartStyles'

interface AddressFormProps {
    address: AddressInfo | null | undefined
    setAddress: React.Dispatch<React.SetStateAction<AddressInfo>>
    addressList?: AddressInfo[] // 주소 목록 prop 추가
}

const AddressForm: React.FC<AddressFormProps> = ({ address, setAddress, addressList = [] }) => {
    const defaultAddress: AddressInfo = {
        name: '',
        recipient: '',
        zipCode: '',
        baseAddress: '',
        detailAddress: '',
        addressId: 0
    }

    const currentAddress = address || defaultAddress

    // 주소 선택 핸들러
    const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(e.target.value)
        const selected = addressList.find(addr => addr.addressId === selectedId)
        if (selected) {
            setAddress(selected)
        }
    }

    return (
        <AddressInputContainer>
            <p style={{ fontWeight: 'bold' }}>배송지 입력</p>

            {/* 주소 선택 드롭다운 */}
            <select
                value={currentAddress.addressId || ''}
                onChange={handleAddressChange}
                style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                }}
            >
                <option value="">새로운 주소 입력</option>
                {addressList.map((addr) => (
                    <option key={addr.addressId} value={addr.addressId}>
                        {addr.recipient} - {addr.baseAddress} {addr.detailAddress}
                    </option>
                ))}
            </select>

            {/* 기존 입력 폼 */}
            <input
                type="text"
                placeholder="받는 사람"
                value={currentAddress.recipient}
                onChange={(e) =>
                    setAddress({ ...currentAddress, recipient: e.target.value })
                }
            />
            <input
                type="text"
                placeholder="우편번호"
                value={currentAddress.zipCode}
                maxLength={5}
                onChange={(e) =>
                    setAddress({
                        ...currentAddress,
                        addressId: Number(e.target.value),
                        zipCode: e.target.value,
                    })
                }
            />
            <input
                type="text"
                placeholder="기본 주소"
                value={currentAddress.baseAddress}
                onChange={(e) =>
                    setAddress({ ...currentAddress, baseAddress: e.target.value })
                }
            />
            <input
                type="text"
                placeholder="상세 주소"
                value={currentAddress.detailAddress}
                onChange={(e) =>
                    setAddress({ ...currentAddress, detailAddress: e.target.value })
                }
            />
        </AddressInputContainer>
    )
}

export default AddressForm