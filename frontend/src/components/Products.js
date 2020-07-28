import React, { Component } from "react";
import ProductsTable from "./ProductsTable";
import ListGroup from "./common/ListGroup";
import Pagination from "./common/Pagination";
import { getProducts } from "../services/ProductService";
import { paginate } from "../utils/Paginate";
import ProductList from "./ProductList";
import PriceFilter from "./PriceFilter";
import _ from "lodash";
class Products extends Component {
  state = {
    products: [],
    priceRange: { min: 0, max: 1000 },
    currentPage: 1,
    pageSize: 6,
  };

  async componentDidMount() {
    const { data: products } = await getProducts();

    this.setState({ products });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handlePriceSelect = ({ min, max }) => {
    if (min < 0) {
      min = 0;
    }
    this.setState({ priceRange: { min, max }, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      priceRange,
      products: allproducts,
    } = this.state;

    const filtered = allproducts.filter((p) => {
      return priceRange.min <= p.price || p.price >= priceRange.max;
    });

    const products = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data: products };
  };
  //<ProductsTable products={products} />

  render() {
    const { length: count } = this.state.products;
    const { pageSize, currentPage } = this.state;

    if (count === 0) return <p>There are no products in the database.</p>;

    const { totalCount, data: products } = this.getPagedData();

    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <PriceFilter onPriceSelect={this.handlePriceSelect} />
          </div>
          <div className="col-9">
            <p>Showing {totalCount} products in the database.</p>
            <ProductList products={products} />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
