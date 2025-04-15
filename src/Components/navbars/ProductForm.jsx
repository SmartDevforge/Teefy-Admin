import React, { useState } from 'react';
import './Product.css';
import { CustomFormInput } from '../input/input'
import { CustomButton } from '../button/Button'
import axios from 'axios';
import { BASE_URL, API_KEY } from '../../api/apiConfig';



const ProductForm = ({ onClick }) => {
    const [formData, setFormData] = useState({
        productName: '',
        quantity: '',
        noOfUnits: '',
        price: '',
        description: '',
        categoryId: '67e2000f8740ecc07f3f2826',
    });

    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');


    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // const handleImageChange = (e) => {
    //     setImage(e.target.files[0]);
    // };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const accessToken = localStorage.getItem('access_token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const form = new FormData();

            form.append('productName', formData.productName);
            // form.append('quantity', JSON.stringify({ piece: Number(formData.quantity) })); 
            form.append('quantity[piece]', Number(formData.quantity));
            form.append('noOfQuantity', Number(formData.noOfUnits));
            form.append('noOfUnits', Number(formData.noOfUnits)); // keep both if required
            form.append('price', Number(formData.price));
            form.append('description', formData.description);
            form.append('categoryId', formData.categoryId);
            form.append('image', image);


            const response = await axios.post(`${BASE_URL}/v1/products/new`, form, {

                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'x-api-key': API_KEY,
                    'Content-Type': 'multipart/form-data',
                },


            });



            console.log('Success:', response.data);
            alert('Product created successfully!');
            onClick();

        } catch (err) {
            console.error('Error:', err.response?.data || err.message);
            console.error('Validation Errors:', err.response?.data.data?.errors);

            alert('Failed to create product.');
        }
    };
    return (

        <form className='product-forms' onSubmit={handleSubmit}>
            <div className='form'>
                <div className='title'>
                    <h5>Create a Product</h5>
                    <span onClick={onClick}>close</span>
                </div>

                <CustomFormInput
                    label={'Product Name'}
                    type={'text'}
                    placeholder={'Ofada Rice'}
                    onChange={handleChange}
                    name="productName"

                />
                <div class="file-upload-container">
                    <label for="dropzone-file" class="dropzone-label">
                        <div class="dropzone-content">
                            <svg class="upload-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 
                 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 
              0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p class="upload-text"><strong>Click to upload</strong> or drag and drop</p>
                            <p class="upload-subtext">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden-input" onChange={handleImageChange} />

                        {previewUrl && (
                            <div className="image-preview">
                                <img src={previewUrl} alt="Preview" style={{ maxWidth: '200px', marginTop: '1rem' }} />
                            </div>
                        )}

                    </label>
                </div>



                {/* <div className=''>
                    <input type="file" name="file" id="file" className='inputfile' onChange={handleImageChange} />
                </div> */}

                <CustomFormInput
                    label={'Quantity for Sale <span>(Size/bunch/piece)</span>'}
                    type={'text'}
                    placeholder={'Ofada Rice'}
                    onChange={handleChange}
                    name="quantity"

                />

                <CustomFormInput
                    label={'Number of Unit'}
                    type={'number'}
                    name="noOfUnits"
                    placeholder={'Ofada Rice'}
                    onChange={handleChange}

                />

                <CustomFormInput
                    label={'Price'}
                    type={'text'}
                    placeholder={'$3'}
                    name="price"
                    onChange={handleChange}
                />
                <div className='textarea'>
                    <label htmlFor="">Description</label>
                    <textarea cols="30" rows="10" name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}></textarea>
                </div>
                <CustomButton type='submit'>Create Product</CustomButton>

            </div>
        </form>
    )
}

export default ProductForm
