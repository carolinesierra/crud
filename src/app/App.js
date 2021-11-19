import React, { Component} from 'react';

class App extends Component {

    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            pedidos: [],
            _id: ''
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
           if(this.state._id) {
               fetch(`/api/tasks/${this.state._id}`, {
                   method:'PUT',
                   body: JSON.stringify(this.state),
                   headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                   }
               })
               .then(res => res.json())
               .then(data => {
                   console.log(data);
                  this.setState({ title:'', description:''});
               });
               this.mostrarPedidos();
           } else {

            fetch('/api/tasks',{
                method:'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({html: 'Pedido guardado:D'});
                    this.setState({title: '', description: ''});
                    this.mostrarPedidos();
                })
                .catch(err => console.error(err));
           }
        e.preventDefault();
    }
   
    
    handleChange(e){
        const {name,value}=e.target;
        this.setState({
            [name]: value
        });
    }

    deletePedido(id){
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.mostrarPedidos();
        });
    }


    editPedido(id){
        fetch(`/api/task/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
            })
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
                                            <button className="btn green lighten-1" type="submit" >Guardar
                                            <i className="material-icons right">send</i></button>
                                        </form>
                                </div>
                            </div>
                        </div>
                        
                        <div className="Cols s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre de pedido</th>
                                        <th>Detalles del pedido</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.pedidos.map(pedido => {
                                        return (
                                            <tr key={pedido._id}>
                                                <td>{pedido.title}</td>
                                                <td>{pedido.description}</td>
                                                <td>
                                                    <button onClick={()=> this.editPedido(pedido._id)} className="btn teal lighten-3"><i className="material-icons">edit</i></button>
                        
                                                    <button onClick={()=> this.deletePedido(pedido._id)} className=" btn red darken-1" style={{margin: '10px'}}><i className="material-icons">delete</i></button>
                                                </td>
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