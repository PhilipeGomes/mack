import { Route, Switch } from "react-router-dom";
import Formulario from "./Formulario";
import Lista from "./Lista";

const Produtos = () => {
    return (
        <Switch>
            <Route path="/admin/products" exact>
                <Lista />
            </Route>
            <Route path="/admin/products/:produtoId" >
                <Formulario />
            </Route>
        </Switch>
    )
}

export default Produtos;