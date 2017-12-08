// Code goes here
var Product = React.createClass({
  getInitialState: function(){
    return {qty: 0};
  },
  buy: function() {
    this.setState({qty: this.state.qty + 1});
    this.props.handleTotal(this.props.price);
  },
  // delete item function
  debuy: function() {
    this.setState({qty: this.state.qty - 1});
    this.props.handeDelete(this.props.price);
  },
  show: function() {
    this.props.handleShow(this.props.name,this.props.price);
  },
  render: function() {
    return (
      <div className="product">
        <div className="product-inner">
          <h4>{this.props.name}</h4>
          <div className="photo"><img src={this.props.img}/></div>
          <p className="price">${this.props.price}</p>
          <button onClick={this.buy} className="buy">buy</button>
          <button onClick={this.show} className="show">show</button>
          <div className="del-container">
          { this.state.qty != 0 &&
           <button onClick={this.debuy} className="delete">delete</button>
          }
          </div>
          <p>Qty: {this.state.qty} item(s)</p>
        </div>
      </div>
    );
  }
});

var Total = React.createClass({
  render: function() {
    return (
      <h3>total cash: <span className="number">${this.props.total}</span></h3>  
    );
  }
});

var ProductForm = React.createClass({

  submit: function(e) {
    e.preventDefault();
    var product = {
      name: this.refs.name.value,
      price: parseInt(this.refs.price.value),
      img: this.refs.img.value
    }
    
    this.props.handleCreate(product); 
    this.refs.name.value = "";
    this.refs.price.value = "";
    
  },
  click: function(e) {
    e.preventDefault();
    var d = document.getElementById("form");
    d.className += " show-this";
    var b = document.getElementById("btn-show");
    b.className += " hide-this";
  },
  render: function() {
    
    var randomArray = [
      'img/51ALtxzk4zL._SY300_.jpg',
      'img/iPhone7_MatBlk_lrg1_en.png',
      'img/6add8591-1d82-439d-9084-12711e414426_1.9023580bc42ab1c410fc32d9ea6a86f5.jpeg',
      'img/10-20461_phoneFront.png',
      'img/pixel_crystal_shell_title_03_large.jpg'
    ];
    var randomElement = randomArray[Math.floor(Math.random() * 5)];
    
    return (

      <div className="form-cont">
        <button onClick={this.click} id="btn-show" className="show-form">Create new</button>
        <form onSubmit={this.submit} id="form">
          <input type="text" placeholder="Product Name" ref="name" required /> &nbsp;
          <input type="text" placeholder="Product Price" ref="price" required />
          &nbsp;&nbsp;<input type="hidden" value={randomElement} ref="img" />
          <button className="add">Create a Product</button>
          <hr />
        </form>
      </div>
    );
  }
});

var Header = React.createClass({
  render: function(){
    return (
      <div className="header-bar">
        <div className="header-inner">
          <img src={this.props.logo} className="logo"/>
        </div>
      </div>
    )
  }
})

var Footer = React.createClass({
  render: function(){
    return (
      <div className="header-bar">
        <div className="credits">{this.props.credits}</div>
      </div>
    )
  }
})

var ProductList = React.createClass({
  getInitialState: function() {
    return {
      total: 0,
      productList: [
        {name: "Android", price: 120, img: "img/iPhone7_MatBlk_lrg1_en.png"},
        {name: "Apple", price: 300, img: "img/51ALtxzk4zL._SY300_.jpg" },
        {name: "Nokia", price: 80, img: "img/iPhone7_MatBlk_lrg1_en.png" },
        {name: "Microsoft", price: 70, img: "img/10-20461_phoneFront.png" },
      ]
    };
  },
  createProduct: function(product) {
    this.setState({
      productList: this.state.productList.concat(product)
    })
  },
  calculateTotal: function(price) {
    this.setState({total: this.state.total + price});
    //console.log(this.state.total);
  },
  // delete item
  deleteTotal: function(price) {
    this.setState({total: this.state.total - price});
  },
  productShow: function(name,price) {
    alert('you are buying '+ name +' for $'+ price);
  },
  
  render: function() {

    var component = this;
    var products = this.state.productList.map(function(product) {
      return (
        <Product handleTotal={component.calculateTotal}  handeDelete={component.deleteTotal} handleShow={component.productShow} 
        name={product.name} price={product.price} img={product.img} />
      );
    });
    return (
      <div>
        <div>
          <Header logo="img/logo-mobile.svg" />
        </div>
        <div>
          <ProductForm handleCreate={this.createProduct}/>
        </div>
        <div className="tatal">
          <Total total={this.state.total}/>
        </div>
        <div className="prod-container">
          {products}
        </div>
        <div className="tatal">
          <Total total={this.state.total}/>
        </div>
        <div>
          <Footer credits="Developed by Leonel Oliveira"/>
        </div>
        
      </div>  
    );
  }
});

React.render(<ProductList />, document.querySelector('product-item'));
