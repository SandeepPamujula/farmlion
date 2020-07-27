import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import { saveProduct } from "../services/ProductService";

class ProductForm extends Form {
  state = {
    data: {
      productName: "",
      variety: "",
      price: 0,
      quantity: 0,
      farmerName: "",
      location: "",
      farmingType: "",
    },
    farmingType: ["Natural", "Organic", "Normal"],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    productName: Joi.string().required().label("ProductName"),
    variety: Joi.string().required().label("Variety"),
    price: Joi.number().required().label("Price"),
    quantity: Joi.number().required().label("Quantity"),
    farmerName: Joi.string().required().label("FarmerName"),
    farmingType: Joi.string().required().label("FarmingType"),
    location: Joi.string().required().label("Location"),
  };

  componentDidMount() {
    /*
    //To change/update existing product
    const ProductId = this.props.match.params.id;
    if (ProductId === "new") return;

    const product = getProduct(ProductId);
    if (!product) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(product) });
    */
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    console.log(this.state.data);
    const response = await saveProduct(this.state.data);
    console.log(response);
    this.props.history.push("/Products");
  };

  render() {
    return (
      <div>
        <h1>Product Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("productName", "ProductName")}
          {this.renderInput("variety", "Variety")}
          {this.renderInput("price", "Price", "number")}
          {this.renderInput("quantity", "Quantity", "number")}
          {this.renderInput("farmerName", "FarmerName")}
          {this.renderSelect(
            "farmingType",
            "FarmingType",
            this.state.farmingType
          )}
          {this.renderInput("location", "Location")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default ProductForm;
