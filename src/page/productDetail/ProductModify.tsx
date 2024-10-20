import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { retrieveClothesDetail, deleteCloth } from "@/api/clothesApi";
import {
    ProductModifyContainer,
    ProductInfoContainer,
    ProductImageContainer,
    ProductMainImage,
    ProductTag,
    ProductWrapper,
    ProductInfo,
    Title,
    ProductSection,
    ButtonContainer,
    Button
} from "@/component/styles/products/modifyStyle.ts";

const ProductModify = () => {
    const { id } = useParams<{ id: string }>()
    const [ product, setProduct ] = useState<any>( null )

    const navigate = useNavigate()

    const [ name, setName ] = useState( '' )
    const [ category, setCategory ] = useState( '' )
    const [ genderCategory, setGenderCategory ] = useState( '' )
    const [ price, setPrice ] = useState(0)
    const [ productNumber, setProductNumber ] = useState(0)
    const [ discount, setDiscount ] = useState(0)
    const [ quantity, setQuantity ] = useState(0)
    const [ size, setSize ] = useState('')
    const [ imageURL, setImageURL ] = useState( '' )
    const [ detailURL, setDetailURL ] = useState('')
    const [ objectURL, setObjectURL ] =useState( '' )

    const loadProductDetails = async () => {
        if ( id ) {
            const details = await retrieveClothesDetail(id)
            setProduct(details)
        }
    }

    const deleteItem = async () => {
        let select = confirm("해당 상품을 삭제하겠습니까?");
        if( select ){
            const result = await deleteCloth( id )
            console.log( result )
            navigate('/adminHome' )
        }
    }

    useEffect( () => {
        loadProductDetails()
    }, [id] )

    if (!product) return <div>Loading...</div>

    return (
        <ProductModifyContainer>
            <Title> 상품 상세 </Title>
            <ProductSection>
                <ProductImageContainer>
                    <ProductMainImage src={product.imageUrl} />
                </ProductImageContainer>
                <ProductInfoContainer>
                    <ProductWrapper>
                        <ProductTag> 이름 </ProductTag>
                        <ProductInfo> {product.name} </ProductInfo>
                    </ProductWrapper>
                    <ProductWrapper>
                        <ProductTag> 카테고리 </ProductTag>
                        <ProductInfo> {product.category} </ProductInfo>
                    </ProductWrapper>
                    <ProductWrapper>
                        <ProductTag> 성별 분류 </ProductTag>
                        <ProductInfo> {product.genderCategory} </ProductInfo>
                    </ProductWrapper>
                    <ProductWrapper>
                        <ProductTag> 상품번호 </ProductTag>
                        <ProductInfo> {product.productNumber} </ProductInfo>
                    </ProductWrapper>
                    <ProductWrapper>
                        <ProductTag> 할인율 </ProductTag>
                        <ProductInfo> {product.discount} </ProductInfo>
                    </ProductWrapper>
                    <ProductWrapper>
                        <ProductTag> 금액 </ProductTag>
                        <ProductInfo> {product.price} </ProductInfo>
                    </ProductWrapper>
                </ProductInfoContainer>
            </ProductSection>
            <ButtonContainer>
                <Button>
                    수정
                </Button>
                <Button
                    onClick={deleteItem}
                >
                    삭제
                </Button>
            </ButtonContainer>
        </ProductModifyContainer>
    )
}

export default ProductModify