import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ProductModify: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [ product, setProduct ] = useState<any>( null )
    const [ category, setCategory ] = useState( '' )
    const [ detailURL, setDetailURL ] = useState('')
    const [ gender, setGender ] = useState( '' )
    const [ imageURL, setImageURL ] = useState( '' )
    const [ name, setName ] = useState( '' )
    const [ price, setPrice ] = useState(0)
    const [ productNumber, setProductNumber ] = useState(0)

    const loadProductDetails = async () => {
        if (id) {
            
        }
    }

    return <></>
}

export default ProductModify