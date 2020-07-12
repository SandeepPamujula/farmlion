import React, { Component } from "react";
import Table from "./common/Table";

class ProductsTable extends Component {
  columns = [
    { path: "productName", label: "name" },
    { path: "productType", label: "type" },
    { path: "price", label: "price" },
    { path: "description", label: "description" },
  ];

  render() {
    const { products } = this.props;

    return <Table columns={this.columns} data={products} />;
  }
}

export default ProductsTable;
