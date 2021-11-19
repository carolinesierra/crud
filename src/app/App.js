import React, { Component} from 'react';

class App extends Component {

    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            pedidos: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addPedido = this.addPedido.bind(this);
    }

    componentDidMount(){
        this.mostrarPedidos();
    }

    mostrarPedidos(){
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            this.setState({pedidos: data});
            console.log(this.state.pedidos)});
    }

    addPedido(e){
        fetch('/api/tasks',{
                method:'POST',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({html: 'Pedido guardado:D'});
                    this.setState({title: '', description: ''});
                })
                .catch(err => console.error(err));

        e.preventDefault();
    }
   
    
    handleChange(e){
        const {name,value}=e.target;
        this.setState({
            [name]: value
        });
    }

    render(){
        return(
            <div>
                {/*nav*/}
                <nav className="red darken-4 ">
                    <div className="container">
                        <a className="brand-logo center" href="/"><i className="material-icons">cake</i>
                         DOLCI
                        </a> 
                    </div>
                </nav>

                <div className="container ">
                    <div className="row ">
                        {/*formulario para agregar pedidos*/}
                        <div className="col s12 center-align">
                            <div className="card center">
                                <div className="card-content container center-align ">
                                     {/*encargado de enviar los datos al server*/}
                                     <form onSubmit={this.addPedido}>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input name="title" onChange={this.handleChange} value={this.state.title} type="text" placeholder="Nombre del pedido"></input>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <textarea name="description"  value={this.state.description} onChange={this.handleChange} placeholder="Detalles del pedido" 
                                                    className="materialize-textarea"></textarea>
                                                </div>
                                            </div>
                                            <button className="btn red darken-4" type="submit" >Enviar
                                            <i className="material-icons right">send</i></button>
                                        </form>
                                </div>
                            </div>
                        </div>
                        
                        <div className="Cols s8">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre de pedido</th>
                                        <th>Detalles del pedido</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.pedidos.map(pedidos => {
                                        return (
                                            <tr>
                                                <td>{pedidos.title}</td>
                                                <td>{pedidos.description}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            </table>
                           
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;