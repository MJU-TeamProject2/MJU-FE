import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useRegisterForm } from "@/component/hook/useRegisterForm";
import {
    ProductRegisterContainer,
    ProductInformationContainer,
    ProductInputContainer,
    ProductContainer,
    ProductImageContainer,
    Tag,
    Title,
    Input,
    Button,
    ProductImage,
    Option,
    Select
} from "@/component/styles/products/registerStyle.ts";
import {registerCloth} from "@/api/clothesApi.ts";

const ProductRegister: React.FC = () => {
    const [ imageURL, setImageURL ] = useState('')
    const [ category, setCategory ] = useState( '' )
    const [ detailURL, setDetailURL ] = useState( '' )
    const [ discount, setDiscount ] = useState(0)
    const [ genderCategory, setGenderCategory ] = useState( '' )
    const [ clothName, setClothName ] = useState( '' )
    const [ productNumber, setProductNumber ] = useState( '' )
    const { formData, errors, handleChange, isFormValid } = useRegisterForm();

    const navigate = useNavigate();

    const handleSubmit = async ( e: React.FormEvent ) => {
        e.preventDefault();
        if( !isFormValid() ) return

        const result = await registerCloth( formData );

        if( result instanceof Error ){
            console.error( result.message )
        } else {
            console.log( "등록 성공" )
            navigate( '/adminHome' );
        }
    }

    return (
        <ProductRegisterContainer>
            <Title> 상품 등록 </Title>
            <form onSubmit={handleSubmit}>
                <ProductContainer>
                    <ProductImageContainer>
                        <ProductImage
                            src="resoureces/image1.jpg"
                        />
                    </ProductImageContainer>
                    <ProductInformationContainer>
                        <ProductInputContainer>
                            <Tag> 상품 이름 </Tag>
                            <Input
                                type="text"
                                name="name"
                            />
                        </ProductInputContainer>
                        <ProductInputContainer>
                            <Tag> 카테고리 </Tag>
                            <Select
                                name="category"
                            >
                                <Option value="DRESSES"> 드레스 </Option>
                                <Option value="OUTERWEAR"> 아우터 </Option>
                                <Option value="PANTS"> 바지 </Option>
                                <Option value="SHOES"> 신발 </Option>
                                <Option value="TOPS"> 상의 </Option>
                            </Select>
                        </ProductInputContainer>
                        <ProductInputContainer>
                            <Tag> 성별 분류 </Tag>
                            <Select
                                name="genderCategory"
                            >
                                <Option value="MALE"> 남성용 </Option>
                                <Option value="FEMALE"> 여성용 </Option>
                                <Option value="UNISEX"> 남녀공용 </Option>
                            </Select>
                        </ProductInputContainer>
                        <ProductInputContainer>
                            <Tag> 상품 가격 </Tag>
                            <Input
                                type="number"
                                name="price"
                                placeholder="0"
                            />
                        </ProductInputContainer>
                        <ProductInputContainer>
                            <Tag> 상품 번호 </Tag>
                            <Input
                                type="text"
                                name="productNumber"
                                placeholder="PRODUCT-001"
                            />
                        </ProductInputContainer>
                        <ProductInputContainer>
                            <Tag> 적용 할인율 </Tag>
                            <Input
                                type="number"
                                name="discount"
                                placeholder="0"
                            />
                        </ProductInputContainer>
                        <ProductInputContainer>
                            <Tag> 사이즈 </Tag>
                            <Select
                                name="size"
                            >
                                <Option value="XS"> XS </Option>
                                <Option value="S"> S </Option>
                                <Option value="M"> M </Option>
                                <Option value="L"> L </Option>
                                <Option value="XL"> XL </Option>
                            </Select>
                        </ProductInputContainer>
                        <ProductInputContainer>
                            <Tag> 현재 재고 </Tag>
                            <Input
                                type="number"
                                name="quantity"
                                placeholder="0"
                            />
                        </ProductInputContainer>
                        <Button
                            type="submit"
                        >
                            등록
                        </Button>
                    </ProductInformationContainer>
                </ProductContainer>
            </form>
        </ProductRegisterContainer>
    )
}

export default ProductRegister