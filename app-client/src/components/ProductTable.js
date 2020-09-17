import React, { useState, useMemo, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { fetchProducts, deleteProduct } from "../actions/product";

const PaginationComponent = ({
  total = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

  const paginationItems = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    return pages;
  }, [totalPages, currentPage, onPageChange]);

  if (totalPages === 0) return null;

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {paginationItems}
      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

const TableHeader = ({ headers, onSorting }) => {
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";
    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };

  return (
    <thead>
      <tr>
        {headers.map(({ name, field, sortable }) => (
          <th
            className="p-3 text-xs text-center text-gray-900 uppercase font-bold tracking-wide"
            key={name}
            onClick={() => (sortable ? onSortingChange(field) : null)}
          >
            {name}

            {sortingField && sortingField === field && (
              <div icon={sortingOrder === "asc" ? "arrow-down" : "arrow-up"} />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const onInputChange = (value) => {
    setSearch(value);
    onSearch(value);
  };
  return (
    <input
      type="text"
      className="p-1 px-2 mt-3 mb-1 border"
      style={{ width: "240px" }}
      placeholder="Search..."
      value={search}
      onChange={(e) => onInputChange(e.target.value)}
    />
  );
};

const ProductTable = ({ fetchProducts, deleteProduct, auth }) => {
  const [products, setProducts] = useState([]);
  // const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const ITEMS_PER_PAGE = 5;

  const headers = [
    { name: "Product Image", field: "", sortable: false },
    { name: "Product Name", field: "title", sortable: true },
    { name: "Stocks", field: "", sortable: false },
    { name: "Action", field: "", sortable: false },
  ];

  useEffect(() => {
    const getData = () => {
      //showLoader();

      fetchProducts().then((response) => {
        //console.log(response);
        setProducts(response.data);
      });
    };

    getData();
  }, [fetchProducts]);

  const productsData = useMemo(() => {
    let computedProducts = products;

    if (search) {
      computedProducts = computedProducts.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedProducts.length);

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedProducts = computedProducts.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedProducts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [products, currentPage, search, sorting]);

  return (
    <>
      {(auth.role === "user" || auth.role === "user_demo") && (
        <Redirect to="/" />
      )}

      <div className="bg-white container mx-auto w-11/12 px-1 text-center">
        <div className="p-5">
          <h1 className="text-center uppercase font-bold text-xl tracking-wide">
            Manage Products
          </h1>
        </div>
        <div className="row">
          <div className="col-md-6 d-flex flex-row-reverse">
            <Search
              onSearch={(value) => {
                setSearch(value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <table className="border w-full text-left shadow-sm">
          <TableHeader
            headers={headers}
            onSorting={(field, order) => setSorting({ field, order })}
          />
          <tbody className="product-table">
            {productsData.map((product, idx) => (
              <tr key={idx}>
                <td>
                  <img
                    src={product.image}
                    alt={product.title}
                    width={60}
                    style={{ margin: "auto" }}
                  />
                </td>
                <td className="text-center">{product.title}</td>
                <td className="text-center">{product.stock}</td>
                {/*<td className="text-center">{product.category}</td>*/}
                <td className="text-center">
                  <div className="edit">
                    <Link
                      to={`/admin/products/${product._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </div>
                  <div className="delete">
                    <button
                      disabled={auth.role === "admin_demo"}
                      className="text-red-500 hover:underline"
                      onClick={() => {
                        if (
                          window.confirm(`Are you sure to delete this product?`)
                        )
                          deleteProduct(product._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row">
          <div className="col-md-6">
            <PaginationComponent
              total={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.product.items || [],
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { fetchProducts, deleteProduct })(
  ProductTable
);
