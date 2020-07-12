import React, { Component } from "react";
import ProductsTable from "./ProductsTable";
import ListGroup from "./common/ListGroup";
import Pagination from "./common/Pagination";
import { getProducts } from "../services/ProductService";
import { paginate } from "../utils/Paginate";
import _ from "lodash";
class Products extends Component {
  state = {
    products: [],
    priceRange: [
      { _id: 11, range: "0-100" },
      { _id: 12, range: "100-200" },
    ],
    currentPage: 1,
    pageSize: 4,
  };

  async componentDidMount() {
    const priceRange = [
      { _id: "", range: "All products" },
      ...this.state.priceRange,
    ];
    const { data: products } = await getProducts();

    this.setState({ products, priceRange });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handlePriceSelect = (prange) => {
    this.setState({ selectedRange: prange, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedRange,
      products: allproducts,
    } = this.state;

    const filtered =
      selectedRange && selectedRange._id
        ? allproducts.filter((p) => {
            const range = selectedRange.range
              .split("-")
              .map((value) => parseInt(value));
            const leftvalue = range[0],
              rightvalue = range[1];
            return leftvalue <= p.price || p.price >= rightvalue;
          })
        : allproducts;

    const products = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data: products };
  };

  render() {
    const { length: count } = this.state.products;
    const { pageSize, currentPage } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>There are no products in the database.</p>;

    const { totalCount, data: products } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.priceRange}
            selectedItem={this.state.selectedRange}
            onRangeSelect={this.handlePriceSelect}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} products in the database.</p>
          <ProductsTable products={products} />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Products;
