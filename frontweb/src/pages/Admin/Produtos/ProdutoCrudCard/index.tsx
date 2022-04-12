import ProductPrice from 'components/ProductPrice';
import { Product } from 'types/product';
import SeloCategoria from 'pages/Admin/Produtos/SeloCategoria';

import './styles.css';
import { Link } from 'react-router-dom';

type Props = {
    product: Product;
}

const ProductCrudCard = ({ product }: Props) => {

    return (
        <div className="base-card product-crud-card">
            <div className="product-crud-card-top-container">
                <img src={product.imgUrl} alt={product.nome} />
            </div>
            <div className="product-crud-card-description">
                <div className="product-crud-card-bottom-container">
                    <h6>{product.nome}</h6>
                    <ProductPrice price={product.valor} />
                </div>
                <div className="product-crud-categories-container">
                    {product.categorias.map(categoria => (
                        <SeloCategoria nome={categoria.nome} key={categoria.id} />
                    ))}
                </div>
            </div>
            <div className="product-crud-card-buttons-container">
                <button className="btn btn-outline-danger product-crud-card-button product-crud-card-button-first ">
                    EXCLUIR
                </button>
                <Link to={`products/${product.id}`}>
                    <button className="btn btn-outline-secondary product-crud-card-button">
                        EDITAR
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default ProductCrudCard;