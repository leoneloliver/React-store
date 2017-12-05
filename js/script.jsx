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
    );
  }
});

var Total = React.createClass({
  render: function() {
    return (
      <h3>total cash: ${this.props.total}</h3>  
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
  render: function() {
    var randomArray = [
      'https://images-na.ssl-images-amazon.com/images/I/51ALtxzk4zL._SY300_.jpg',
      'https://www.bell.ca/Styles/wireless/all_languages/all_regions/catalog_images/iPhone_7/iPhone7_MatBlk_lrg1_en.png',
      'https://i5.walmartimages.com/asr/6add8591-1d82-439d-9084-12711e414426_1.9023580bc42ab1c410fc32d9ea6a86f5.jpeg',
      'http://www.virginmobile.ca/assets/phones/10-20461/10-20461_phoneFront.png',
      'https://cdn.shopify.com/s/files/1/0808/0067/products/pixel_crystal_shell_title_03_large.jpg'
    ];
    var randomElement = randomArray[Math.floor(Math.random() * 5)];
    
    return (
      <form onSubmit={this.submit}>
        <input type="text" placeholder="Product Name" ref="name" required /> - 
        <input type="text" placeholder="Product Price" ref="price" required />
        <br/><br/>
        <input type="hidden" value={randomElement} ref="img" />
        <button className="add">Creat Product</button>
        <hr />
      </form>
    );
  }
});

var ProductList = React.createClass({
  getInitialState: function() {
    return {
      total: 0,
      productList: [
        {name: "Android", price: 120, img: "https://www.bell.ca/Styles/wireless/all_languages/all_regions/catalog_images/iPhone_7/iPhone7_MatBlk_lrg1_en.png"},
        {name: "Apple", price: 300, img: "https://images-na.ssl-images-amazon.com/images/I/51ALtxzk4zL._SY300_.jpg" },
        {name: "Nokia", price: 80, img: "https://www.bell.ca/Styles/wireless/all_languages/all_regions/catalog_images/iPhone_7/iPhone7_MatBlk_lrg1_en.png" },
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
          <ProductForm handleCreate={this.createProduct}/>
        </div>
        <div>
          {products}
        </div>
        <div className="tatal">
          <Total total={this.state.total}/>
        </div>
      </div>  
    );
  }
});


React.render(<ProductList />, document.querySelector('product-item'));
