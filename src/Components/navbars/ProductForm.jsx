import React from 'react';
import './Product.css';
import { CustomFormInput } from '../input/input'
import { CustomButton } from '../button/Button'

const ProductForm = ({onClick}) => {
    return (

        <form>
            <div className='form'>
                <div className='title'>
                    <h5>Create a Product</h5>
                    <span onClick={onClick}>close</span>
                </div>

                <CustomFormInput
                    label={'Product Name'}
                    type={'text'}
                    placeholder={'Ofada Rice'}
                />

                <div className='inputfile-label'>
                    <input type="file" name="file" id="file" className='inputfile' />
                    <label htmlFor="file">choose file</label>
                </div>

                <CustomFormInput
                    label={'Quantity for Sale <span>(Size/bunch/piece)</span>'}
                    type={'text'}
                    placeholder={'Ofada Rice'}
                />

                <CustomFormInput
                    label={'Number of Unit'}
                    type={'number'}
                    placeholder={'Ofada Rice'}
                />

                <CustomFormInput label={'Price'} type={'text'} placeholder={'$3'} />
                <div className='textarea'>
                    <label htmlFor="">Description</label>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <CustomButton>Create Product</CustomButton>

            </div>
        </form>
    )
}

export default ProductForm
