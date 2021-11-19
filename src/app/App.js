import React, { Component} from 'react';

class App extends Component {

    constructor(){
        super();
        this.state = {
            title: '',
            description: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addPedido = this.addPedido.bind(this);
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

                <div className="container">
                    <div className="row">
                        {/*formulario para agregar pedidos*/}
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                     {/*encargado de enviar los datos al server*/}
                                     <form onSubmit={this.addPedido}>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input name="title" onChange={this.handleChange} value={this.state.title} type="text" placeholder="Nombre del pedido"></input>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <textarea name="description"  value={this.state.description} onChange={this.handleChange} placeholder="Descripción del pedido" 
                                                    className="materialize-textarea"></textarea>
                                                </div>
                                            </div>
                                            <button className="btn red darken-4" type="submit" >Enviar
                                            <i className="material-icons right">send</i></button>
                                        </form>
                                </div>
                            </div>
                        </div>
                        
                        <div className="Cols s5">




                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;