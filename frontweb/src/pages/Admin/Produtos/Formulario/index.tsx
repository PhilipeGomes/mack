import './styles.css';
import { useForm } from 'react-hook-form';
import { Product } from 'types/product';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';


type UrlParams = {
    productId: string;
  };

const Formulario = () => {

    const { productId } = useParams<UrlParams>();

    const isEditing = productId !== 'create';

    const history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<Product>();

    useEffect(() => {
        if(isEditing) {
            requestBackend({ url: `produtos/${productId}`})
            .then((response) => {
                const produto = response.data as Product;
                setValue('nome', produto.nome);
                setValue('valor', produto.valor);
                setValue('descricao', produto.descricao);
                setValue('qtdEstoque', produto.qtdEstoque);
                setValue('marca', produto.marca);
                setValue('undVenda', produto.undVenda);
                setValue('imgUrl', produto.imgUrl);
                setValue('categorias', produto.categorias);
            });
        }
    }, [isEditing, productId,setValue]);

    const onSubmit = (formData: Product) => {

        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/produtos',
            data: formData
        };

        requestBackend(config).then(() => {
            history.push("/admin/products");
            });
    };


    const handleCancel = () => {
        history.push("/admin/products");
    }

    return (
        <div className="product-crud-container">
            <div className="base-card product-crud-form-card">
                <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row product-crud-inputs-container">
                        <div className="col-lg-6 product-crud-inputs-left-container">
                            <div className="margin-bottom-30">
                                <input {...register('nome', {
                                    required: 'Campo Obriga??rio'
                                })}
                                    type="text"
                                    className={`form-control base-input ${errors.nome ? 'is-invalid' : ''
                                        }`}
                                    placeholder="Nome do produto"
                                    name="nome"
                                />
                                <div className="invalid-feedback d-block">
                                    {errors.nome?.message}
                                </div>
                            </div>

                            <div className="margin-bottom-30">
                                <input {...register('valor', {
                                    required: 'Campo Obriga??rio'
                                })}
                                    type="text"
                                    className={`form-control base-input ${errors.valor ? 'is-invalid' : ''
                                        }`}
                                    placeholder="Pre??o"
                                    name="valor"
                                />
                                <div className="invalid-feedback d-block">
                                    {errors.valor?.message}
                                </div>
                            </div>
                            
                            <div className="margin-bottom-30">
                                <input {...register('qtdEstoque', {
                                    required: 'Campo Obriga??rio'
                                })}
                                    type="text"
                                    className={`form-control base-input ${errors.qtdEstoque ? 'is-invalid' : ''
                                        }`}
                                    placeholder="Quantidade no estoque"
                                    name="qtdEstoque"
                                />
                                <div className="invalid-feedback d-block">
                                    {errors.qtdEstoque?.message}
                                </div>
                            </div>
                            <div className="margin-bottom-30">
                                <input {...register('marca', {
                                    required: 'Campo Obriga??rio'
                                })}
                                    type="text"
                                    className={`form-control base-input ${errors.marca ? 'is-invalid' : ''
                                        }`}
                                    placeholder="Marca"
                                    name="marca"
                                />
                                <div className="invalid-feedback d-block">
                                    {errors.marca?.message}
                                </div>
                            </div>
                            <div className="margin-bottom-30">
                                <input {...register('undVenda', {
                                    required: 'Campo Obriga??rio'
                                })}
                                    type="text"
                                    className={`form-control base-input ${errors.undVenda ? 'is-invalid' : ''
                                        }`}
                                    placeholder="Unidade de venda"
                                    name="undVenda"
                                />
                                <div className="invalid-feedback d-block">
                                    {errors.undVenda?.message}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div>
                                <textarea
                                    rows={10}
                                    {...register('descricao', {
                                        required: 'Campo Obriga??rio'
                                    })}
                                    className={`form-control base-input h-auto ${errors.valor ? 'is-invalid' : ''
                                        }`}
                                    placeholder="Descri????o"
                                    name="descricao"
                                />
                                <div className="invalid-feedback d-block">
                                    {errors.valor?.message}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-crud-buttons-container">
                        <button 
                        className="btn btn-outline-danger product-crud-button"
                        onClick={handleCancel}
                        >CANCELAR</button>
                        <button className="btn btn-outline-primary product-crud-button">SALVAR</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Formulario;